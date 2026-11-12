import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { type Fields, type File, type Files } from 'formidable'
import { readFile, unlink } from 'node:fs/promises'
import {
  ALLOWED_CAPSULE_IMAGE_TYPES,
  MAX_CAPSULE_FILE_SIZE,
  isAllowedCapsuleImageType,
  isCapsuleFileSizeAllowed,
  validateCapsuleMetadata,
} from '@/lib/capsuleValidation'

export const config = {
  api: {
    bodyParser: false,
  },
}

class IpfsNodeError extends Error {}

function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
  const form = formidable({
    maxFiles: 1,
    maxFileSize: MAX_CAPSULE_FILE_SIZE,
    filter: ({ mimetype }) =>
      isAllowedCapsuleImageType(mimetype),
  })

  return new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error)
        return
      }

      resolve({ fields, files })
    })
  })
}

function getSingleFile(files: Files): File | undefined {
  const file = files.file
  return Array.isArray(file) ? file[0] : file
}

function getSingleField(value: string | string[] | undefined): string | undefined {
  if (typeof value === 'string') return value
  return value?.length === 1 ? value[0] : undefined
}

async function addToIpfs(body: FormData): Promise<string> {
  try {
    const apiUrl = new URL('/api/v0/add?pin=true&cid-version=1', process.env.IPFS_API_URL || 'http://127.0.0.1:5001')
    const response = await fetch(apiUrl, {
      method: 'POST',
      body,
    })

    if (!response.ok) {
      throw new Error(`IPFS node returned status ${response.status}`)
    }

    const records = (await response.text()).trim().split('\n').filter(Boolean)
    const result = records.length > 0 ? JSON.parse(records[records.length - 1]) : null
    if (!result || typeof result.Hash !== 'string') {
      throw new Error('IPFS node did not return a content identifier')
    }

    return result.Hash
  } catch (error) {
    throw new IpfsNodeError(
      error instanceof Error ? error.message : 'IPFS node request failed'
    )
  }
}

function getErrorStatus(error: unknown): number {
  if (
    typeof error === 'object' &&
    error !== null &&
    'httpCode' in error &&
    typeof error.httpCode === 'number'
  ) {
    return error.httpCode
  }

  return 500
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let uploadedFile: File | undefined

  try {
    const { fields, files } = await parseForm(req)
    uploadedFile = getSingleFile(files)

    if (!uploadedFile) {
      return res.status(400).json({ error: 'Choose a supported image to upload' })
    }

    if (!isAllowedCapsuleImageType(uploadedFile.mimetype)) {
      return res.status(400).json({ error: 'Only JPEG, PNG, WebP, and GIF images are supported' })
    }
    if (!isCapsuleFileSizeAllowed(uploadedFile.size)) {
      return res.status(400).json({ error: 'Image must be larger than 0 bytes and no larger than 10 MB' })
    }

    const metadata = validateCapsuleMetadata(
      getSingleField(fields.title),
      getSingleField(fields.description)
    )
    if ('error' in metadata) {
      return res.status(400).json({ error: metadata.error })
    }

    const imageForm = new FormData()
    const imageBytes = await readFile(uploadedFile.filepath)
    imageForm.append(
      'file',
      new Blob([new Uint8Array(imageBytes)], { type: uploadedFile.mimetype }),
      uploadedFile.originalFilename || 'capsule-image'
    )

    const imageHash = await addToIpfs(imageForm)
    const metadataForm = new FormData()
    metadataForm.append(
      'file',
      new Blob(
        [
          JSON.stringify({
            name: metadata.title,
            description: metadata.description,
            image: `ipfs://${imageHash}`,
          }),
        ],
        { type: 'application/json' }
      ),
      'capsule.json'
    )
    const ipfsHash = await addToIpfs(metadataForm)

    return res.status(200).json({
      ok: true,
      ipfsHash,
      imageHash,
    })
  } catch (error) {
    const status = error instanceof IpfsNodeError ? 502 : getErrorStatus(error)
    if (status >= 500) {
      console.error('Capsule upload failed:', error)
    }
    return res.status(status).json({
      error: status === 413
        ? 'Image exceeds the 10 MB upload limit'
        : status === 502
          ? 'The self-hosted IPFS node is unavailable'
          : 'Failed to upload capsule',
    })
  } finally {
    if (uploadedFile) {
      try {
        await unlink(uploadedFile.filepath)
      } catch (error) {
        console.error('Failed to remove temporary capsule upload:', error)
      }
    }
  }
}

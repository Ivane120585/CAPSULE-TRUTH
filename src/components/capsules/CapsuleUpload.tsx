// src/components/capsules/CapsuleUpload.tsx
import { useCallback, useEffect, useState } from 'react'
import { useDropzone, type FileRejection } from 'react-dropzone'
import Image from 'next/image'
import {
  ALLOWED_CAPSULE_IMAGE_TYPES,
  MAX_CAPSULE_FILE_SIZE,
} from '@/lib/capsuleValidation'

export default function CapsuleUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [uploadedHash, setUploadedHash] = useState('')

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const selectedFile = acceptedFiles[0]
    setErrorMessage('')
    setUploadedHash('')

    if (!selectedFile) {
      setErrorMessage(fileRejections[0]?.errors[0]?.message || 'Select a supported image.')
      return
    }

    setFile(selectedFile)
    setPreviewUrl(URL.createObjectURL(selectedFile))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: Object.fromEntries(
      ALLOWED_CAPSULE_IMAGE_TYPES.map((type) => [type, []])
    ),
    maxSize: MAX_CAPSULE_FILE_SIZE,
    multiple: false
  })

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file || !title.trim() || !description.trim()) return

    setIsUploading(true)
    setErrorMessage('')
    setUploadedHash('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title.trim())
      formData.append('description', description.trim())

      const response = await fetch('/api/capsules', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setUploadedHash(data.ipfsHash)
      setFile(null)
      setTitle('')
      setDescription('')
      setPreviewUrl(null)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-black p-6 rounded-xl shadow-xl w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🧠 Upload a Memory Capsule</h2>

      <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${isDragActive ? 'border-primary' : 'border-gray-400 dark:border-gray-600'}`}>
        <input {...getInputProps()} />
        {previewUrl ? (
          <Image src={previewUrl} alt="Preview" width={320} height={200} unoptimized className="mx-auto rounded-md" />
        ) : (
          <p className="text-gray-500">Drag and drop a JPEG, PNG, WebP, or GIF image (up to 10 MB), or click to select.</p>
        )}
      </div>

      <form onSubmit={handleUpload}>
        <label className="sr-only" htmlFor="capsule-title">Capsule title</label>
        <input
          id="capsule-title"
          type="text"
          placeholder="Capsule Title"
          value={title}
          maxLength={120}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-4 w-full border px-4 py-2 rounded-md dark:bg-zinc-900 dark:text-white"
          required
        />

        <label className="sr-only" htmlFor="capsule-description">Capsule description</label>
        <textarea
          id="capsule-description"
          placeholder="Capsule Description"
          value={description}
          maxLength={2000}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-2 w-full border px-4 py-2 rounded-md dark:bg-zinc-900 dark:text-white"
          required
        />

        <button
          type="submit"
          disabled={!file || !title.trim() || !description.trim() || isUploading}
          className="mt-4 w-full bg-primary text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : 'Upload Capsule'}
        </button>
      </form>

      {errorMessage && <p role="alert" className="mt-3 text-sm text-red-600">{errorMessage}</p>}
      {uploadedHash && (
        <p role="status" className="mt-3 text-sm text-green-700 dark:text-green-400">
          Capsule uploaded. Metadata: <a className="underline" href={`/api/ipfs/${uploadedHash}`} target="_blank" rel="noreferrer">{uploadedHash}</a>
        </p>
      )}
    </div>
  )
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidIpfsCid, MAX_CAPSULE_FILE_SIZE } from '@/lib/capsuleValidation'
import { IpfsResponseTooLargeError, readIpfsResponse } from '@/lib/ipfsResponse'

const MAX_IPFS_RESPONSE_SIZE = MAX_CAPSULE_FILE_SIZE + 1024 * 1024

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { cid } = req.query
  if (!isValidIpfsCid(cid)) {
    return res.status(400).json({ error: 'Invalid content identifier' })
  }

  try {
    const gatewayUrl = new URL(
      `/ipfs/${cid}`,
      process.env.IPFS_GATEWAY_URL || 'http://127.0.0.1:8080'
    )
    const response = await fetch(gatewayUrl, { signal: AbortSignal.timeout(30_000) })

    if (!response.ok) {
      await response.body?.cancel()
      return res.status(response.status === 404 ? 404 : 502).json({
        error: response.status === 404 ? 'Content not found' : 'IPFS gateway request failed',
      })
    }

    const content = await readIpfsResponse(response, MAX_IPFS_RESPONSE_SIZE)

    res.setHeader(
      'Content-Type',
      response.headers.get('content-type') || 'application/octet-stream'
    )
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Content-Security-Policy', "default-src 'none'; sandbox")
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    return res.status(200).send(content)
  } catch (error) {
    if (error instanceof IpfsResponseTooLargeError) {
      return res.status(413).json({ error: 'Content exceeds the maximum response size' })
    }
    console.error('IPFS content fetch failed:', error)
    return res.status(502).json({ error: 'Self-hosted IPFS gateway is unavailable' })
  }
}

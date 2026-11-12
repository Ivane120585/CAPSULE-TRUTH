export class IpfsResponseTooLargeError extends Error {}

export async function readIpfsResponse(response: Response, maxBytes: number): Promise<Buffer> {
  const contentLength = response.headers.get('content-length')
  if (contentLength !== null && Number(contentLength) > maxBytes) {
    await response.body?.cancel()
    throw new IpfsResponseTooLargeError()
  }

  if (!response.body) return Buffer.alloc(0)

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let size = 0

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > maxBytes) {
        await reader.cancel()
        throw new IpfsResponseTooLargeError()
      }
      chunks.push(value)
    }
  } finally {
    reader.releaseLock()
  }

  return Buffer.concat(chunks, size)
}

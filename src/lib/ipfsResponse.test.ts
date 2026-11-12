import { describe, expect, it, vi } from 'vitest'
import { IpfsResponseTooLargeError, readIpfsResponse } from './ipfsResponse'

describe('readIpfsResponse', () => {
  it('reads content at the size limit', async () => {
    const response = new Response('1234')
    expect((await readIpfsResponse(response, 4)).toString()).toBe('1234')
  })

  it('rejects and cancels an oversized advertised response', async () => {
    const cancel = vi.fn()
    const stream = new ReadableStream({ cancel })
    const response = new Response(stream, { headers: { 'content-length': '5' } })
    await expect(readIpfsResponse(response, 4)).rejects.toBeInstanceOf(IpfsResponseTooLargeError)
    expect(cancel).toHaveBeenCalledOnce()
  })

  it('rejects and cancels oversized streamed content without a length header', async () => {
    const cancel = vi.fn()
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('123'))
        controller.enqueue(new TextEncoder().encode('45'))
      },
      cancel,
    })
    await expect(readIpfsResponse(new Response(stream), 4)).rejects.toBeInstanceOf(IpfsResponseTooLargeError)
    expect(cancel).toHaveBeenCalledOnce()
  })
})

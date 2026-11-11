import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { title, description, ipfsHash } = req.body ?? {}

  if (!title || !description || !ipfsHash) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const pinataApiKey = process.env.PINATA_API_KEY
  const pinataSecret = process.env.PINATA_SECRET_API_KEY

  if (!pinataApiKey || !pinataSecret) {
    return res.status(500).json({ error: 'Pinata credentials are not configured' })
  }

  try {
    await axios.post(
      'https://api.pinata.cloud/data/pinList',
      {
        status: 'pinned',
        includeCount: true,
        pageLimit: 10,
      },
      {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecret,
        },
      }
    )

    return res.status(200).json({ ok: true, title, description, ipfsHash })
  } catch (error) {
    console.error('Capsule creation failed:', error)
    return res.status(500).json({ error: 'Failed to process capsule metadata' })
  }
}

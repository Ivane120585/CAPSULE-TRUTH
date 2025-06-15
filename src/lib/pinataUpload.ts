// src/lib/pinataUpload.ts
import axios from 'axios'

const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_SECRET = process.env.PINATA_API_SECRET // optional if JWT used
const PINATA_ENDPOINT = 'https://api.pinata.cloud/pinning/pinFileToIPFS'

export async function uploadFileToIPFS(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const res = await axios.post(PINATA_ENDPOINT, formData, {
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${PINATA_API_KEY}`,
    },
  })

  return res.data.IpfsHash
}

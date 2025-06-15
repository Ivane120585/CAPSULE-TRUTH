// src/lib/replicate.ts
import axios from 'axios'

const replicateApi = axios.create({
  baseURL: 'https://api.replicate.com/v1/predictions',
  headers: {
    Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
    'Content-Type': 'application/json',
  },
})

interface GenerateImageInput {
  prompt: string
  model: string // e.g. "stability-ai/sdxl"
}

export async function generateImage({ prompt, model }: GenerateImageInput) {
  const response = await replicateApi.post('/', {
    version: model,
    input: {
      prompt,
      width: 768,
      height: 768,
    },
  })

  return response.data
}

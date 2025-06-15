// src/components/capsules/CapsuleUpload.tsx
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import axios from 'axios'

export default function CapsuleUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    setFile(selectedFile)
    setPreviewUrl(URL.createObjectURL(selectedFile))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  })

  const handleUpload = async () => {
    if (!file) return
    setIsUploading(true)

    try {
      // Upload to Pinata
      const formData = new FormData()
      formData.append('file', file)
      const metadata = JSON.stringify({ name: title, keyvalues: { description } })
      formData.append('pinataMetadata', metadata)
      formData.append('pinataOptions', JSON.stringify({ cidVersion: 1 }))

      const pinataRes = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY!,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET!,
        },
      })

      const ipfsHash = pinataRes.data.IpfsHash

      // Save to Supabase
      await axios.post('/api/capsules', {
        title,
        description,
        ipfsHash
      })

      alert('Memory capsule uploaded successfully!')
      setFile(null)
      setTitle('')
      setDescription('')
      setPreviewUrl(null)
    } catch (err) {
      console.error(err)
      alert('Upload failed. Please try again.')
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
          <Image src={previewUrl} alt="Preview" width={320} height={200} className="mx-auto rounded-md" />
        ) : (
          <p className="text-gray-500">Drag & drop an image or click to select</p>
        )}
      </div>

      <input
        type="text"
        placeholder="Capsule Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mt-4 w-full border px-4 py-2 rounded-md dark:bg-zinc-900 dark:text-white"
      />

      <textarea
        placeholder="Capsule Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="mt-2 w-full border px-4 py-2 rounded-md dark:bg-zinc-900 dark:text-white"
      />

      <button
        disabled={!file || !title || !description || isUploading}
        onClick={handleUpload}
        className="mt-4 w-full bg-primary text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50"
      >
        {isUploading ? 'Uploading...' : 'Mint Capsule'}
      </button>
    </div>
  )
}

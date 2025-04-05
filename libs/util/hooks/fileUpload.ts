import { useState } from 'react'

export const useLocalFileUpload = () => {
  const [uploading, setUploading] = useState(false)

  const upload = async (fileList: FileList) => {
    setUploading(true)

    try {
      const uploadPromises = Array.from(fileList).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/file-upload/upload`,
          { method: 'POST', body: formData },
        )

        if (!response.ok) throw new Error('Upload failed')

        const data = await response.json()
        const imageUrl = data.filename as string
        return imageUrl
      })

      const uploadedImages = await Promise.all(uploadPromises)
      return uploadedImages
    } catch (error) {
      throw new Error('Upload failed')
    } finally {
      setUploading(false)
    }
  }
  return { upload, uploading }
}

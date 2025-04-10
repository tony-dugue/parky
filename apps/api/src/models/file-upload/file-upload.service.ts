import { BadRequestException, Injectable } from '@nestjs/common'
import { FileUpload } from './entity/file-upload.entity'
import fs from 'fs'
import sharp from 'sharp'
import path from 'path'

@Injectable()
export class FileUploadService {
  async uploadFile(file: Express.Multer.File): Promise<FileUpload> {
    if (!file) throw new BadRequestException('no file uploaded')

    // validate file type
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/pdf',
    ]
    if (!allowedMimeTypes.includes(file.mimetype))
      throw new BadRequestException('invalid file type')

    // validate file size (e.g., max 5mb)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) throw new BadRequestException('file is too large!')

    const uploadDir = path.join(process.cwd(), 'uploads')

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

    const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`
    const filePath = path.join(uploadDir, filename)
    const compressedImageBuffer = await sharp(file.buffer)
      .webp({ quality: 75 })
      .toBuffer()

    fs.writeFileSync(filePath, compressedImageBuffer)

    return { filename }
  }
}

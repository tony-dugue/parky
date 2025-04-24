import { PrismaClient } from '@prisma/client'
import { readdir, copyFile, mkdir, access } from 'fs/promises'
import path from 'path'
import { constants } from 'fs'
import { seedUsers } from './seeds/seedUsers'
import { seedCompanies } from './seeds/seedCompanies'
import { seedGarages } from './seeds/seedGarages'
import { seedVerifications } from './seeds/seedVerifications'

const prisma = new PrismaClient()

async function main() {
  // seed company
  await seedCompanies()
  // seed users with different role
  await seedUsers()
  // seed garages & slots
  await seedGarages()
  // seed garages & slots
  await seedVerifications()
  // copié les images dans le dossier uploads
  await copyImagesToUploadsDir()
}

async function copyImagesToUploadsDir() {
  const sourceDir = path.resolve(__dirname, 'seeds', 'images') // api/prisma/seeds/images
  const destDir = path.resolve(__dirname, '..', 'uploads') // api/uploads

  try {
    await mkdir(destDir, { recursive: true }) // crée uploads/ si pas encore là

    const files = await readdir(sourceDir)

    for (const file of files) {
      const src = path.join(sourceDir, file)
      const dest = path.join(destDir, file)

      try {
        await access(dest, constants.F_OK) // Vérifie si le fichier existe
      } catch {
        await copyFile(src, dest)
      }
    }

    console.log('✅ Images copied to uploads directory')
  } catch (error) {
    console.error('❌ Error copying images:', error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

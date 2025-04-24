import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedVerifications() {
  const adminId = `56a9d-881cf-45fd-fake-admin1`
  const now = new Date()

  const verifications = [1, 2, 3, 4, 5].map((garageId, i) => ({
    createdAt: new Date(now.getTime() + i * 2000), // espacement de 2s entre les dates
    updatedAt: new Date(now.getTime() + i * 2000),
    verified: true,
    adminId,
    garageId,
  }))

  for (const verification of verifications) {
    await prisma.verification.create({
      data: verification,
    })
  }

  console.log('✅ Seeding completed for Verifications')
}

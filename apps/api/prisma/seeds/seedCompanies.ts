import { PrismaClient } from '@prisma/client'
import { nbCompanies } from './seedConfig'
const prisma = new PrismaClient()

export async function seedCompanies() {
  const companies = []

  for (let i = 1; i <= nbCompanies; i++) {
    companies.push({
      id: i,
      displayName: `Company ${i}`,
      description: `my description company ${i}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  for (const company of companies) {
    await prisma.company.create({
      data: company,
    })
  }

  console.log('✅ Seeding completed for Companies')
}

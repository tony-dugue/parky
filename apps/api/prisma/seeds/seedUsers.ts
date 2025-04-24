import { PrismaClient, AuthProviderType } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { roles, usersPerRole } from './seedConfig'

const prisma = new PrismaClient()

export async function seedUsers() {
  for (const role of roles) {
    for (let i = 1; i <= usersPerRole; i++) {
      const uid = `56a9d-881cf-45fd-fake-${role.toLowerCase()}${i}`
      const email = `${role.toLowerCase()}${i}@test.com`

      // Hash the password
      const salt = bcrypt.genSaltSync()
      const passwordHash = bcrypt.hashSync('Test123!', salt)

      const roleData: Record<string, any> = {
        Valet: {
          displayName: `${role} ${i}`,
          licenceID: `LIC-${i}`,
        },
        Admin: {},
        Manager: {
          displayName: `${role} ${i}`,
          companyId: i,
        },
        default: {
          displayName: `${role} ${i}`,
        },
      }

      await prisma.user.create({
        data: {
          uid,
          name: `${role} ${i}`,
          image: null,
          Credentials: {
            create: {
              email,
              passwordHash,
            },
          },
          AuthProvider: {
            create: {
              type: AuthProviderType.CREDENTIALS,
            },
          },
          [role]: {
            create: roleData[role] || roleData.default,
          },
        },
      })
    }
  }
  console.log('✅ Seeding completed for Users')
}

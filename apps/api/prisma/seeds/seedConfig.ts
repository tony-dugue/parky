const refNumber = 2

export const roles = ['Admin', 'Manager', 'Valet', 'Customer'] as const
export const usersPerRole = refNumber
export const nbCompanies = refNumber

export function generatedCompanyId() {
  return Math.floor(Math.random() * nbCompanies) + 1
}

export const randomRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

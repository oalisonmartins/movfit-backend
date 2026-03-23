export function calculateAge(birthDate: Date) {
  const today = new Date()

  today.setUTCHours(0, 0, 0, 0)
  birthDate.setUTCHours(0, 0, 0, 0)

  const userAge = today.getUTCFullYear() - birthDate.getUTCFullYear()

  return userAge
}

import { PrismaClient, Role } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // 1) Office oluştur
  const office = await prisma.office.create({
    data: { name: "Demo Emlak Ofisi" },
  })

  // 2) Admin kullanıcı oluştur
  const passwordHash = await bcrypt.hash("admin123", 10)

  await prisma.user.create({
    data: {
      officeId: office.id,
      name: "Owner Admin",
      email: "admin@demo.com",
      passwordHash,
      role: Role.OWNER,
    },
  })

  console.log("✅ Seed OK")
  console.log("OfficeId:", office.id)
  console.log("Login: admin@demo.com / admin123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

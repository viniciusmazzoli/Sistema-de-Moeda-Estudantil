// prisma/seed.cjs
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@sistema.com";
  const adminPassword = "admin123";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("✅ Admin já existe:", existingAdmin.email);
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      name: "Administrador do Sistema",
      email: adminEmail,
      passwordHash,
      role: "ADMIN",
      account: {
        create: {
          balance: 0,
        },
      },
    },
  });

  console.log("🎉 Admin criado com sucesso:");
  console.log({
    email: admin.email,
    senha: adminPassword,
    role: admin.role,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

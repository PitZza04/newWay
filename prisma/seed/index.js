import { PrismaClient } from "@prisma/client";
import { seed as seedAddress } from "./address.js";
//import { parentSeed } from "./parent.js";
const prisma = new PrismaClient();

async function main() {
  let exitStatus = 0;
  try {
    console.log("ahhah");
    await seedAddress(prisma);
    //await seedAddress(prisma);
  } catch (error) {
    console.error(error);
    exitStatus = 1;
  } finally {
    await prisma.$disconnect();
    process.exit(exitStatus);
  }
}

main();

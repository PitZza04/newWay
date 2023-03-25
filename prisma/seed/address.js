import smallData from "./data/SmallJSON.json" assert { type: "json" };
export async function seed(prisma) {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Region" CASCADE;`);
  for (const address of smallData) {
    await prisma.region.create({
      data: {
        id: address.id,
        region_name: address.region_name,
        region_code: address.region_code,
        province: {
          create: address.province.map((province) => {
            return {
              province_name: province.province_name,
              city: {
                create: province.city.map((city) => {
                  return {
                    city_name: city.city_name,
                    barangay: {
                      create: city.barangay.map((barangay) => {
                        return {
                          barangay_name: barangay.barangay,
                        };
                      }),
                    },
                  };
                }),
              },
            };
          }),
        },
      },
      include: {
        province: {
          city: {
            include: {
              barangay: true,
            },
          },
        },
      },
    });
  }

  // await prisma.region.createMany({
  //   data: smallData.map((address) => {
  //     return {
  //       id: address.id,
  //       region_name: address.region_name,
  //       region_code: address.region_code,
  //       province: {
  //         createMany: {
  //           data: address.province.map((province) => ({
  //             province_name: province.province_name,
  //             region_id: address.id,
  //           })),
  //         },
  //       },
  //     };
  //   }),
  // });
}

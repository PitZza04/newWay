export async function parentSeed(prisma) {
  await prisma.parent.create({
    data: {
      name: "Parent Name",
      children: {
        createMany: {
          data: [
            {
              name: "Child 1 Name",
              grandchildren: {
                connect: [{ id: 1 }, { id: 2 }],
              },
            },
            {
              name: "Child 2 Name",
              grandchildren: {
                connect: [{ id: 3 }, { id: 4 }],
              },
            },
          ],
        },
      },
    },
  });
}

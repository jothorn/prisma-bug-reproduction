import { PrismaClient } from "@prisma/client";
import { brokenQuery1, brokenQuery2, brokenQuery3 } from "@prisma/client/sql";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: 1,
      name: "foo",
    },
  });

  await prisma.post.create({
    data: {
      id: 1,
      user_id: 1,
    },
  });

  const stringParam = "foo";
  const intParam = 1;

  console.log("\n--- Testing brokenQuery1 ---");
  const typedResult1 = await prisma.$queryRawTyped(
    brokenQuery1(stringParam, intParam)
  );
  const rawResult1 = await prisma.$queryRaw`
      SELECT
          u.name,
          p.id
      FROM "User" AS u
      LEFT JOIN
          "Post" AS p
          ON
              u.id = p.user_id
              AND p.id = ${intParam}
      WHERE
          u.name = ${stringParam}
    `;
  console.log("TypedSQL Result:", typedResult1);
  console.log("Raw SQL Result:", rawResult1);

  console.log("\n--- Testing brokenQuery2 ---");
  const typedResult2 = await prisma.$queryRawTyped(
    brokenQuery2(stringParam, intParam)
  );
  const rawResult2 =
    await prisma.$queryRaw`SELECT ${intParam} FROM "User" AS u WHERE u.name = ${stringParam}`;
  console.log("TypedSQL Result:", typedResult2);
  console.log("Raw SQL Result:", rawResult2);

  console.log("\n--- Testing brokenQuery3 ---");
  const typedResult3 = await prisma.$queryRawTyped(brokenQuery3(stringParam));
  const rawResult3 = await prisma.$queryRaw`SELECT ${stringParam}`;
  console.log("TypedSQL Result:", typedResult3);
  console.log("Raw SQL Result:", rawResult3);
}

main();

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { User } from "lib/Types";

export default async function addUser(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  try {
    const { name, email, phone, address } = req.body || {};
    const userData = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        address,
      },
    });
    console.log("userData", userData);
    // @ts-ignore
    res.status(201).json({ data: userData });
  } catch (err: any) {
    res.status(500).json(err);
    console.log(err);
  }
}

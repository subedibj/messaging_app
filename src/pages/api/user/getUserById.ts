import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAllusers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const getAllusers = await prisma.user.findUnique({
      where: {
        id: req.body,
      },
    });
    res
      .status(200)
      .json({ message: "successfully get branch !", data: getAllusers });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
}

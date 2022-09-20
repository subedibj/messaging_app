import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getAllImages(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const getAllImages = await prisma.image.findMany();
    res
      .status(200)
      .json({ message: "successfully get images !", data: getAllImages });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
}

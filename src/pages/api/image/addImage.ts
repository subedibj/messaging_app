import prisma from "lib/prisma";
import { UserImage } from "lib/Types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addImage(
  req: NextApiRequest,
  res: NextApiResponse<UserImage>
) {
  try {
    const { url, title, category, userId } = req.body || {};
    console.log("req.body", req.body);
    const userImage = await prisma.image.create({
      data: {
        url,
        title,
        category,
        userId,
      },
    });
    console.log("userImage", userImage);
    // @ts-ignore
    res.status(201).json({ data: userImage });
  } catch (err: any) {
    res.status(500).json(err);
    console.log("error :", err);
  }
}

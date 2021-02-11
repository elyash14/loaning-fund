import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../src/prisma/prisma";
import { makeHash } from "../../src/utils/general";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await prisma.user.create({
      data:{
        username: 'elyas',
        password: makeHash('elyash14'),
        firstName: 'Elyas',
        lastName : 'Mosayebi',
        phone: "09118060752",
        role: 'ADMIN'
      }
    })
    const user = await prisma.user.findFirst({
      where: {
        username: 'elyas'
      }
    });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

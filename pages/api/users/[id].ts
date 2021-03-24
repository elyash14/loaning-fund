import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../src/prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id;
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        gender: true,
        avatarPicture: true,
        createdAt: true,
        color: true,
        phone: true,
        creditCard: true,
      },
      where: { id: String(id) },
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../src/prisma/prisma';
import { makeHash } from '../../src/utils/general';
import jwt from 'next-auth/jwt';

const secret = process.env.APP_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = await jwt.getToken({ req, secret });
    console.log('JSON Web Token', token);
    // const data = await prisma.user.create({
    //   data:{
    //     username: 'elyas',
    //     password: makeHash('elyash14'),
    //     firstName: 'Elyas',
    //     lastName : 'Mosayebi',
    //     phone: "09118060752",
    //     role: 'ADMIN'
    //   }
    // })
    // const user = await prisma.user.findFirst({
    //   where: {
    //     username: 'elyas'
    //   }
    // });
    res.status(200).json({ success: true, data: token });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

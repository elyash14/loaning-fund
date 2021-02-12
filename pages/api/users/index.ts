import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../src/prisma/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
  
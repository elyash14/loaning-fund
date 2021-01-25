import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = "test";
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

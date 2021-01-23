import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../src/models/User";
import dbConnect from "../../src/utils/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await dbConnect();

  try {
    // User.create(
    //   { name: "elyas", username: "elyas", password: "elyash14" },
    //   function (err, small) {
    //     // saved!
    //   }
    // );
    const data = await User.find({}); /* find all the data in our database */
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

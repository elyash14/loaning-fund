import type { NextApiRequest, NextApiResponse } from "next";
import Test from "../../src/models/Test";
import dbConnect from "../../src/utils/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await dbConnect();

  try {
    // Test.create({ name: "asb", document: "gov" }, function (err, small) {
    //   // saved!
    // });
    const data = await Test.find({}); /* find all the data in our database */
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

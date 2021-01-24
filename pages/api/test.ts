import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../src/models/User";
import dbConnect from "../../src/utils/dbConnect";
import { makeHash } from "../../src/utils/general";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await dbConnect();
  try {
    // const password = makeHash('123456')
    // User.create(
    //   { name: "admin", username: "admin", password },
    //   function (err, data) {
    //     console.log(err, data);
        
    //   }
    // );
    const data = await User.find({}); /* find all the data in our database */
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

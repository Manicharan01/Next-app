import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Admin from "@/pages/api/db/Admin";
import { z } from "zod";
import { SECRET } from "@/pages/api/middleware/index";
import dbConnect from "@/pages/api/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  if (req.method === "POST") {
    const checkObj = z
      .object({
        username: z.string().min(6).max(30),
        password: z.string().min(8).max(20),
      })
      .strict();

    const { username, password } = req.body;

    const check = await checkObj.safeParseAsync({ username, password });

    const admin = await Admin.findOne({ username }).exec();
    if (admin) {
      res.status(403).json({ messange: "Admin already exits" });
    } else if (check) {
      await Admin.create({ username: username, password: password });

      const token = jwt.sign({ username, role: "admin" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin created sucessfully", token: token });
    } else {
      res.status(403).send({ message: "Invalid Input Types" });
    }
  }
}

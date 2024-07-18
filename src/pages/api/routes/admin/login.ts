import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Admin from "@/pages/api/db/Admin";
import { SECRET } from "@/pages/api/middleware/index";

export default async function handler(
  res: NextApiResponse,
  req: NextApiRequest,
) {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username, password });

  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged In sucessfully", token: token });
  } else {
    res.status(403).json({ message: "Invalid Username or Password" });
  }
}

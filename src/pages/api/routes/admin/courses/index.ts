import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import * as jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Course from "@/pages/api/db/Course";
import { SECRET } from "@/pages/api/middleware/index";
import dbConnect from "@/pages/api/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  if (req.method === "POST") {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, SECRET);
      if (!decoded) {
        res.status(403).send({ message: "Invalid" });
      } else {
        const checkCourse = z
          .object({
            _id: z.number(),
            title: z.string(),
            description: z.string(),
            price: z.number(),
            imageLink: z.string(),
            published: z.boolean(),
          })
          .strict();

        const _id = req.body._id;
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        const imageLink = req.body.imageLink;
        const published = req.body.published;

        const courseChecker = await checkCourse.safeParseAsync({
          _id,
          title,
          description,
          price,
          imageLink,
          published,
        });

        if (courseChecker) {
          await Course.create({
            _id: _id,
            title: title,
            description: description,
            price: price,
            imageLink: imageLink,
            published: published,
          });

          res.json({
            message: "Course created sucessfully",
          });
        }
      }
    } else {
      res.status(403);
    }
  } else if (req.method === "GET") {
    const courses = await Course.find({});
    res.json({ courses });
  }
}

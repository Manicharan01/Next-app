import { NextApiResponse, NextApiRequest } from "next";
import Course from "@/pages/api/db/Course";
import * as jwt from "jsonwebtoken";
import { SECRET } from "@/pages/api/middleware/index";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
    method,
  } = req;

  if (method === "PUT") {
    const courseId = id;
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, SECRET);
      if (!decoded) {
        res.status(403);
      } else {
        const updatedTitle = req.body.title;
        const updatedDescription = req.body.description;
        const updatedPrice = req.body.price;
        const updatedImageLink = req.body.imagelink;
        const updatedPublished = req.body.published;
        const updatedCourse = {
          title: updatedTitle,
          description: updatedDescription,
          price: updatedPrice,
          imageLink: updatedImageLink,
          published: updatedPublished,
        };
        const course = await Course.findByIdAndUpdate(courseId, updatedCourse, {
          new: true,
        });
        if (course) {
          res.json({ message: "Course updated sucessfully" });
        } else {
          res.json({ message: "Course not found" });
        }
      }
    } else {
      res.status(403);
    }
  } else if (method === "GET") {
    const courseId = id;
    const course = await Course.findById(courseId);
    res.json({ course });
  }
}

import mongoose from "mongoose";

async function dbConnect() {
  mongoose
    .connect(
      "mongodb+srv://admin:root@cluster0.hzhhmf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/courses",
    )
    .then((mongoose) => {
      return mongoose;
    });
}

export default dbConnect;

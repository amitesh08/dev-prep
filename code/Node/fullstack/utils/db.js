import mongoose from "mongoose";

const db = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database connnected");
    })
    .catch((err) => {
      console.log("error connecting DB" + err);
    });
};

export default db;

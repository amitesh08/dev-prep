import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); //to use json objects

//to send data via URL
app.use(
  express.urlencoded({
    extended: true,
  })
);

//to access cookies
app.use(cookieParser());

const port = process.env.PORT || 3001;

app.use("/api/v1/users", router);

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

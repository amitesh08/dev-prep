import express from "express"; //importing express
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js";
import router from "./routes/user.routes.js";

dotenv.config();
const app = express(); //initializing

//for cors
app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//to accept json format data
app.use(express.json());

app.use(
  express.urlencoded({
    //to send data via URL
    extended: true,
  })
);

const port = process.env.PORT || 3001; //if port is not working it will work on 3001

//Routes
app.use("/api/v1/users", router);

//connect to DB.
db();

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

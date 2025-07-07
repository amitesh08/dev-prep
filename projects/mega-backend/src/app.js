import express from "express";
import cookieParser from "cookie-parser";

//router imports
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  express.urlencoded({
    //to send data via URL
    extended: true,
  }),
);

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1", authRouter);

export default app;

import express from "express";
import type { Router } from "express";
import HealthController from "./controller";

export function register(): Router {
  const router = express.Router();
  const controller = new HealthController();

  router.get("/", controller.handleHealthCheck.bind(controller));
  return router;
}

import { Router } from "express";
import { UserRoleEnum } from "../utils/constants.js";
import { validateProjectPermission } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/:projectId")
  .get(
    validateProjectPermission([UserRoleEnum.ADMIN, UserRoleEnum.MEMBER]),
    getNotes,
  )
  .post(
    validateProjectPermission([UserRoleEnum.ADMIN], [UserRoleEnum.MEMBER]),
    createNote,
  );

export default router;

import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { loginUserSchema, registerUserSchema, requestResetEmailSchema } from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
    loginUserController,
    logoutUserController,
    refreshUserSessionController,
    registerUserController
} from "../controllers/auth.js";
import { requestResetEmailController } from "../controllers/contacts.js";

const router = Router();

router.post("/register", validateBody(registerUserSchema), ctrlWrapper(registerUserController));
router.post("/login", validateBody(loginUserSchema), ctrlWrapper(loginUserController));
router.post("/refresh", ctrlWrapper(refreshUserSessionController));
router.post("/logout", ctrlWrapper(logoutUserController));
router.post("/request-reset-email", validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

export default router;
import express from "express";
import { registerController, loginController } from "../controllers/auth.js";
import { validateBody, } from '../validation/validateBody.js';
import { registerSchema, loginSchema } from "../validation/auth.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const router = express.Router();

router.post("/register",validateBody(registerSchema), ctrlWrapper(registerController));

router.post("/login", validateBody(loginSchema), ctrlWrapper(loginController));

export default router;
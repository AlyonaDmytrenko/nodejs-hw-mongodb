import express from "express";
import { registerController } from "../controllers/auth.js";
import { validateBody, } from '../validation/validateBody.js';
import { registerSchema } from "../validation/auth.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const router = express.Router();

router.post("/register",validateBody(registerSchema), ctrlWrapper(registerController));

export default router;
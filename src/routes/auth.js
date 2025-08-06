import express from 'express';
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  requestPasswordResetController,
} from '../controllers/auth.js';
import { validateBody } from '../validation/validateBody.js';
import {
  registerSchema,
  loginSchema,
  requestPasswordResetSchema,
} from '../validation/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

router.post('/login', validateBody(loginSchema), ctrlWrapper(loginController));

router.post('/logout', ctrlWrapper(logoutController));

router.post('/refresh', ctrlWrapper(refreshController));

router.post(
  '/auth/send-reset-email',
  validateBody(requestPasswordResetSchema),
  ctrlWrapper(requestPasswordResetController),
);

export default router;

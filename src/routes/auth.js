import express from 'express';
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  sendResetEmailController,
  resetPwdController,
  getOAuthController
} from '../controllers/auth.js';

import { validateBody } from '../validation/validateBody.js';
import {
  registerSchema,
  loginSchema,
  sendResetEmailSchema,
  resetPwdSchema
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
  '/send-reset-email',
  
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

router.post(
<<<<<<< Updated upstream
  '/reset-pwd',
  validateBody(resetPwdSchema),
  ctrlWrapper(resetPwdController),
=======
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
>>>>>>> Stashed changes
);

router.get(
  '/get-oauth-url',
  ctrlWrapper(getOAuthController),
);
export default router;

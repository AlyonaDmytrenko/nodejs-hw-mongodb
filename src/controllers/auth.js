import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
  requestPasswordReset,
  resetPassword,
} from '../services/auth.js';

export async function registerController(req, res) {
  const user = await registerUser(req.body);

  res.json({ status: 201, message: 'User register succsessfully', data: user });
}

export async function loginController(req, res) {
  const session = await loginUser(req.body.email, req.body.password);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.json({
    status: 200,
    message: 'User login successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function logoutController(req, res) {
  const { sessionId } = req.cookies;

  if (typeof sessionId !== 'undefined') {
    await logoutUser(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).end();
}

export async function refreshController(req, res) {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.json({
    status: 200,
    message: 'Session refreshed successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function requestPasswordResetController(req, res) {
  await requestPasswordReset(req.body.email);

  res.json({ status: 200, message: 'Message sent succesfully' });
}

export async function resetPaswordController(req, res) {
  const { token, password } = req.body;

  await resetPassword(token, password);

  res.json({ status: 200, message: '' });
}

import { registrUswer, loginUser, logoutUser } from '../services/auth.js';

export async function registerController(req, res) {
  const user = await registrUswer(req.body);

  res.json({ status: 201, message: 'User register succsessfully', data: user });
}

export async function loginController(req, res) {
  const session = await loginUser(req.body.email, req.body.password);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
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
  const { sessionID } = req.cookies;

  if (typeof sessionID !== 'undefined') {
    await logoutUser(sessionID);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).end();
}

export function refreshController(req, res) {
  res.send('Refresh');
}

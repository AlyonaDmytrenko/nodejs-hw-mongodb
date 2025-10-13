import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
  sendResetEmail,
  resetPwd,
  loginOrRegister,
} from '../services/auth.js';

import { getOuthURL, validateCode } from '../utils/googleOAuth.js';

export async function registerController(req, res, next) {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      status: 201,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginController(req, res, next) {
  try {
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
      message: 'User logged in successfully',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function logoutController(req, res, next) {
  try {
    const { sessionId } = req.cookies;

    if (sessionId) {
      await logoutUser(sessionId);
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function refreshController(req, res, next) {
  try {
    const { sessionId, refreshToken } = req.cookies;

    if (!sessionId || !refreshToken) {
      return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }

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
  } catch (error) {
    next(error);
  }
}

export async function sendResetEmailController(req, res, next) {
  try {
    await sendResetEmail(req.body.email);
    res.json({ status: 200, message: 'Message sent successfully' });
  } catch (error) {
    next(error);
  }
}

export async function resetPwdController(req, res, next) {
  try {
    const { token, password } = req.body;
    await resetPwd(token, password);
    res.json({ status: 200, message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
}

export async function getOAuthController(req, res) {
  const url = await getOuthURL();

  res.json({
    status: 200,
    message: 'Succesfully get OAuth url',
    data: {
      oauth_url: url,
    },
  });
}

export async function confirmOAuthController(req, res) {
  const ticket = await validateCode(req.body.code);

  const session = await loginOrRegister(
    ticket.payload.email,
    ticket.payload.name,
  );

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
    message: 'Login via OAuth successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
}

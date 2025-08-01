import createHttpError from 'http-errors';

import { Contact } from '../models/contactModel.js';
import { Session } from '../models/session.js';

export async function auth(req, res, next) {
  const { authorization } = req.headers;

  if (typeof authorization !== 'string') {
    throw new createHttpError.Unauthorized('Plase provide accss token');
  }

  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    throw new createHttpError.Unauthorized('Please provide access token');
  }

  const session = await Session.findOne({ accessToken });

  if (session === null) {
    throw new createHttpError.Unauthorized('Session not found');
  }

  next();
}

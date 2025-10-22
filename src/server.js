import * as fs from 'node:fs';

import path from 'node:path';
import cors from 'cors';
import express from 'express';
import contactsRouter from './routes/contactsRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import { auth } from './middlewares/auth.js';

import swaggerUI from 'swagger-ui-express';

import dotenv from 'dotenv';

dotenv.config();

const SWAGGER_DOCUMENT = JSON.parse(
  fs.readFileSync(path.join('docs', 'swagger.json'), 'utf-8'),
);

export function setupServer() {
  const app = express();

  app.use(cors());
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(SWAGGER_DOCUMENT));

  app.use(express.json());
  app.use(cookieParser());

  app.use('/photos', express.static(path.resolve('src/uploads/photos')));

  app.use('/auth', authRoutes);

  app.get('/', (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'Welcome to the Contacts API',
    });
  });

  app.use('/contacts', auth, contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  return app;
}

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
  app.use(express.json());
  app.use(cookieParser());

  // Swagger UI
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(SWAGGER_DOCUMENT));

  // Віддаємо swagger.json для ReDoc
  app.get('/api-docs/swagger.json', (req, res) => {
    res.sendFile(path.resolve('docs', 'swagger.json'));
  });

  // ReDoc на головній сторінці
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Contacts API Docs</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>body { margin: 0; padding: 0; }</style>
          <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
        </head>
        <body>
          <redoc spec-url="/api-docs/swagger.json"></redoc>
        </body>
      </html>
    `);
  });

  app.use('/photos', express.static(path.resolve('src/uploads/photos')));
  app.use('/auth', authRoutes);
  app.use('/contacts', auth, contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

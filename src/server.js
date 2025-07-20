import express from 'express';
import contactsRouter from './routes/contactsRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

export function setupServer() {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'Welcome to the Contacts API',
    });
  });

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  return app;
}

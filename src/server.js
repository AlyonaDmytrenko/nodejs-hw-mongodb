import express from 'express';
import { getContacts, getContact } from './controllers/contactsController.js';

export function setupServer() {
  const app = express();
  app.use(express.json());

  app.get('/contacts', getContacts);
  app.get('/contacts/:contactId', getContact);

  
  

  app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'Welcome to the Contacts API'
  });
});
  app.use((req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Not found'
    });
  });


  return app;
}

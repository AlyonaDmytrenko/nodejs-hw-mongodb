import express from 'express';
import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact
} from '../controllers/contactsController.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', ctrlWrapper(getContact));
router.post('/', ctrlWrapper(createContact));
router.delete('/:contactId', ctrlWrapper(deleteContact));
router.put('/:contactId', ctrlWrapper(updateContact));

export default router;

import express from 'express';
import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact
} from '../controllers/contactsController.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';

import {isValidId} from '../middlewares/isValidId.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContact));
router.post('/', ctrlWrapper(createContact));
router.delete('/:contactId', isValidId,  ctrlWrapper(deleteContact));
router.put('/:contactId', isValidId, ctrlWrapper(updateContact));

export default router;

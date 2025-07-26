import express from 'express';
import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  patchContact 
} from '../controllers/contactsController.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';

import {isValidId} from '../middlewares/isValidId.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContact));
router.post('/', ctrlWrapper(createContact));
router.delete('/:contactId', isValidId,  ctrlWrapper(deleteContact));
router.put('/:contactId', isValidId, ctrlWrapper(updateContact));
router.delete('/:contactId', ctrlWrapper(deleteContact));
router.put('/:contactId', ctrlWrapper(updateContact));
router.patch('/:contactId', ctrlWrapper(patchContact));


export default router;

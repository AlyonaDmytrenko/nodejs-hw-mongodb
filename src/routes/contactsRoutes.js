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
import {validateBody, } from '../validation/validateBody.js';
import {contactSchema, updateContactSchema} from '../validation/isValidateContact.js';


const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContact));
router.post('/', validateBody(contactSchema), ctrlWrapper(createContact));
router.delete('/:contactId', isValidId,  ctrlWrapper(deleteContact));
router.put('/:contactId', validateBody(contactSchema), isValidId, ctrlWrapper(updateContact));
router.patch('/:contactId',  isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContact));


export default router;


import express from 'express';
import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  patchContact,
} from '../controllers/contactsController.js';

import { upload } from '../middlewares/upload.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../validation/validateBody.js';
import {
  contactSchema,
  updateContactSchema,
} from '../validation/isValidateContact.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', auth, ctrlWrapper(getContacts));
router.get('/:contactId', auth, isValidId, ctrlWrapper(getContact));
router.post(
  '/',
  upload.single("avatar"),
  auth,
  validateBody(contactSchema),
  ctrlWrapper(createContact),
);
router.delete('/:contactId', auth, isValidId, ctrlWrapper(deleteContact));
router.put(
  '/:contactId',
  auth,
  validateBody(contactSchema),
  isValidId,
  ctrlWrapper(updateContact),
);
router.patch(
  '/:contactId',
  auth,
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContact),
);

export default router;

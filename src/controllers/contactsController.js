import ContactsService from '../services/contacts.js';
import createError from 'http-errors';
import * as fs from 'node:fs/promises';
import path from 'node:path';

import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

const handlePhotoUpload = async (file) => {
  if (!file) return null;

  if (process.env.UPLOAD_TO_CLOUDINARY === "true") {
    const result = await uploadToCloudinary(file.path);
    await fs.unlink(file.path);
    return result.secure_url;
  } else {
    const uploadDir = path.resolve('src/uploads/avatars');
    await fs.rename(file.path, path.join(uploadDir, file.filename));
    return `http://localhost:3000/avatars/${file.filename}`;
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await ContactsService.getAllContacts(
      page,
      perPage,
      sortBy,
      sortOrder,
      { ...filter, userId: req.user.id },
    );

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await ContactsService.getContactById(contactId, req.user.id);

    if (!contact) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const photoUrl = await handlePhotoUpload(req.file);

    req.body.userId = req.user.id;

    const newContact = await ContactsService.createContact({
      ...req.body,
      photo: photoUrl,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleted = await ContactsService.deleteContact(contactId, req.user.id);

    if (!deleted) {
      throw createError(404, 'Contact not found');
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    let photoUrl = null;
    if (req.file) {
      photoUrl = await handlePhotoUpload(req.file);
    }

    const updateData = { ...req.body };
    if (photoUrl) updateData.photo = photoUrl;

    const updated = await ContactsService.updateContact(contactId, updateData, req.user.id);

    if (!updated) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated a contact!',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const sanitizedContactId = contactId.trim();

    const contact = await ContactsService.getContactById(sanitizedContactId, req.user.id);

    if (!contact) {
      throw createError(404, 'Contact not found');
    }

    let photoUrl = null;
    if (req.file) {
      photoUrl = await handlePhotoUpload(req.file);
    }

    const updatedData = {
      name: req.body.name ?? contact.name,
      phoneNumber: req.body.phoneNumber ?? contact.phoneNumber,
      email: req.body.email ?? contact.email,
      isFavourite: req.body.isFavourite !== undefined ? req.body.isFavourite : contact.isFavourite,
      contactType: req.body.contactType ?? contact.contactType,
    };

    if (photoUrl) updatedData.photo = photoUrl;

    const updatedContact = await ContactsService.updateContact(sanitizedContactId, updatedData, req.user.id);

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};


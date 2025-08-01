import ContactsService from '../services/contacts.js';
import createError from 'http-errors';

import{parsePaginationParams} from "../utils/parsePaginationParams.js";
import {parseSortParams} from "../utils/parseSortParams.js";
import {parseFilterParams} from "../utils/parseFilterParams.js";

export const getContacts = async (req, res) => {

  const {page, perPage}= parsePaginationParams(req.query);
  const {sortBy, sortOrder} = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

 

  const contacts = await ContactsService.getAllContacts(page, perPage, sortBy, sortOrder, filter);

 
   console.log(req.user);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await ContactsService.getContactById(contactId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContact = async (req, res) => {
  const newContact = await ContactsService.createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deleted = await ContactsService.deleteContact(contactId);

  if (!deleted) {
    throw createError(404, 'Contact not found');
  }

  res.sendStatus(204);
};

export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updated = await ContactsService.updateContact(contactId, req.body);

  if (!updated) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updated,
  });
};


export const patchContact = async (req, res) => {
  const { contactId } = req.params;

  const sanitizedContactId = contactId.trim();

  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  try {

    console.log('Sanitized Contact ID:', sanitizedContactId);


    const contact = await ContactsService.getContactById(sanitizedContactId);
    if (!contact) {
      throw createError(404, 'Contact not found');
    }


    const updatedData = {
      name: name || contact.name,
      phoneNumber: phoneNumber || contact.phoneNumber,
      email: email || contact.email,
      isFavourite: isFavourite !== undefined ? isFavourite : contact.isFavourite,
      contactType: contactType || contact.contactType
    };


    const updatedContact = await ContactsService.updateContact(sanitizedContactId, updatedData);


    console.log('Updated contact:', updatedContact);


    res.status(200).json({
      status: 200,
      message: "Successfully patched a contact!",
      data: updatedContact
    });
  } catch (error) {

    console.error('Error during patching contact:', error);

    if (error.status === 404) {
      return res.status(404).json({ status: 404, message: error.message });
    }


    res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: error.message
    });
  }
};
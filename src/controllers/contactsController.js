import ContactsService from '../services/contacts.js';
import createError from 'http-errors';

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await ContactsService.getAllContacts();
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
    const contact = await ContactsService.getContactById(contactId);

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
    const newContact = await ContactsService.createContact(req.body);
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
    const deleted = await ContactsService.deleteContact(contactId);

    if (!deleted) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Contact with id ${contactId} deleted`,
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updated = await ContactsService.updateContact(contactId, req.body);

    if (!updated) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Contact with id ${contactId} updated successfully`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

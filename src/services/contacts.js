import { Contact } from '../models/contactModel.js';

const getAllContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const createContact = async (payload) => {
  return await Contact.create(payload);
};

const deleteContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};

const updateContact = async (contactId, payload) => {
  return await Contact.findByIdAndUpdate(contactId, payload, { new: true });
};

export default {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};

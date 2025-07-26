import { Contact } from '../models/contactModel.js';

const getAllContacts = async (page, perPage) => {

  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();

  return await contactQuery.skip(skip).limit(perPage);
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

export const patchContactById = async (contactId, updateData) => {
  return await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
};

export default {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  patchContactById
};

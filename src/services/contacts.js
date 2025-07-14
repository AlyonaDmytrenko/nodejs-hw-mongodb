import { Contact } from '../models/contactModel.js';

const getAllContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export default {
  getAllContacts,
  getContactById,
};
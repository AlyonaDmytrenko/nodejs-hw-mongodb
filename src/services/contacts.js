import { Contact } from '../models/contactModel.js';
import { parseFilterParams } from "../utils/parseFilterParams.js";  

const getAllContacts = async (page, perPage, sortBy, sortOrder, query) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;


  const filter = parseFilterParams(query);


  let contactQuery = Contact.find();


  if (filter.contactType) {
    contactQuery = contactQuery.where('contactType').equals(filter.contactType);
  }
  if (typeof filter.isFavourite !== 'undefined') {
    contactQuery = contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

 
  const totalItems = await Contact.countDocuments(filter); 


  const contacts = await contactQuery.sort({ [sortBy]: sortOrder }).skip(skip).limit(perPage);


  const totalPages = Math.ceil(totalItems / perPage);


  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  return {
      data: contacts,
      page: page,
      perPage: perPage,
      totalItems: totalItems,
      totalPages: totalPages,
      hasPreviousPage,
      hasNextPage
  };
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



import { Contact } from '../models/contactModel.js';
import { parseFilterParams } from "../utils/parseFilterParams.js";  


const getAllContacts = async (page, perPage, sortBy, sortOrder, query) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const filter = parseFilterParams(query);
  const userId = query.userId; 

  let contactQuery = Contact.find({ userId }); 


  if (filter.contactType) {
    contactQuery = contactQuery.where('contactType').equals(filter.contactType);
  }

  if (typeof filter.isFavourite !== 'undefined') {
    contactQuery = contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const totalItems = await Contact.countDocuments({ userId, ...filter });

  const contacts = await contactQuery
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(perPage);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};


const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
};


const createContact = async (payload) => {
  return await Contact.create(payload); 
};


const deleteContact = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};


const updateContact = async (contactId, payload, userId) => {
  return await Contact.findOneAndUpdate({ _id: contactId, userId }, payload, {
    new: true,
  });
};


const patchContactById = async (contactId, updateData, userId) => {
  return await Contact.findOneAndUpdate({ _id: contactId, userId }, updateData, {
    new: true,
  });
};

export default {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  patchContactById,
};


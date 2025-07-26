import { Contact } from '../models/contactModel.js';

const getAllContacts = async (page, perPage) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  
  const contactQuery = Contact.find();


  const totalItems = await Contact.find().countDocuments();

 
  const contacts = await contactQuery.skip(skip).limit(perPage);


  const totalPages = Math.ceil(totalItems / perPage);

 
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;


  return {
    status: 200,
    message: "Successfully found contacts!",
    data: {
      data: contacts,        
      page: page,            
      perPage: perPage,      
      totalItems: totalItems, 
      totalPages: totalPages, 
      hasPreviousPage,      
      hasNextPage           
    }
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


// import { Contact } from '../models/contactModel.js';

// const  getAllContacts =  async (page, perPage) => {

//   const skip = page > 0 ? (page - 1) * perPage : 0;

//   const contactQuery = Contact.find();

//   const totalItems = await Contact.find().countDocuments();
//   const contacts = contactQuery.skip(skip).limit(perPage);

//   const totalPages = Math.ceil(count/perPage);

  
//   return 
//   {
//     status,
//     message,
//     data{
//         data,
//         page,
//         perPage
//         "totalItems": 6,
//         "totalPages": 2,
//         "hasPreviousPage": true,
//         "hasNextPage": false
//     }
// };
// };

// const getContactById = async (contactId) => {
//   return await Contact.findById(contactId);
// };

// const createContact = async (payload) => {
//   return await Contact.create(payload);
// };

// const deleteContact = async (contactId) => {
//   return await Contact.findByIdAndDelete(contactId);
// };

// const updateContact = async (contactId, payload) => {
//   return await Contact.findByIdAndUpdate(contactId, payload, { new: true });
// };

// export const patchContactById = async (contactId, updateData) => {
//   return await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
// };

// export default {
//   getAllContacts,
//   getContactById,
//   createContact,
//   deleteContact,
//   updateContact,
//   patchContactById
// };

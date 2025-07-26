import { isValidObjectId } from 'mongoose';

export function isValidId(req, res, next) {
  
  const contactId = req.params.contactId.trim(); 

  console.log("Raw contactId:", req.params.contactId);  

  if (!isValidObjectId(contactId)) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'ID is not valid' 
    });
  }

  console.log('Valid ID:', contactId); 


  req.params.contactId = contactId;

  next(); 
}

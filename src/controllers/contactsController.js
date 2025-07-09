import ContactsService from '../services/contacts.js';

export const getContacts = async (req, res) => {
  try {
    const contacts = await ContactsService.getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Server error' });
  }
};

export const getContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await ContactsService.getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

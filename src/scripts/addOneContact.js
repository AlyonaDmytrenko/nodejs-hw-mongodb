import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';  // функція для генерації випадкового контакту

const addOneContact = async () => {
  try {
  
    const contacts = await readContacts();


    const newContact = createFakeContact();

 
    contacts.push(newContact);


    await writeContacts(contacts);

    console.log('Контакт успішно додано:', newContact);
  } catch (error) {
    console.error('Помилка додавання контакту:', error);
  }
};

addOneContact();  

export default addOneContact;

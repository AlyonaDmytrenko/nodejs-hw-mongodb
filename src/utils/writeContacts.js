import fs from 'fs/promises';
import { PATH_DB } from '../constants/contacts.js';

export const writeContacts = async (contacts) => {
  try {
    await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2), {encoding: 'utf-8'});
  } catch (error) {
    console.error('Помилка запису в файл:', error);
  }
};

export default writeContacts;
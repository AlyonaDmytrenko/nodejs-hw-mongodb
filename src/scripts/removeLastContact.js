import readContacts from "../utils/readContacts.js";
import writeContacts from "../utils/writeContacts.js";

const removeLastContact = async () => {
  try {
    const contacts = await readContacts();

    if (contacts.length === 0) {
      console.log("Контактів немає — видаляти нічого.");
      return;
    }

    const removed = contacts.pop();
    await writeContacts(contacts);

    console.log("Видалено останній контакт:");
    console.table(removed);
  } catch (error) {
    console.error("Помилка при видаленні останнього контакту:", error.message);
  }
};

removeLastContact();

export default removeLastContact;
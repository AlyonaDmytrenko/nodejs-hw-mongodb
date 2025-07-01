import readContacts from "../utils/readContacts.js";

const getAllContacts = async () => {
  try {
    const contacts = await readContacts();

    if (contacts.length === 0) {
      console.log("Контактів поки немає.");
    } else {
      console.log("Усі контакти:");
      console.table(contacts);
    }
  } catch (error) {
    console.error("Помилка при зчитуванні контактів:", error.message);
  }
};

getAllContacts();

export default getAllContacts;

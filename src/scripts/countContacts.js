import readContacts from "../utils/readContacts.js";

const countContacts = async () => {
  try {
    const contacts = await readContacts();
    console.log(`Загальна кількість контактів: ${contacts.length}`);
  } catch (error) {
    console.error("Помилка при підрахунку контактів:", error.message);
  }
};

countContacts();

export default countContacts;

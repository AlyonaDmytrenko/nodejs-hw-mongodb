import readContacts from "../utils/readContacts.js";
import writeContacts from "../utils/writeContacts.js";
import createFakeContact from "../utils/createFakeContact.js";

const COUNT = 5;

const generateContacts = async () => {
  try {
    const oldContacts = await readContacts();
    const newContacts = Array.from({ length: COUNT }, createFakeContact);
    const updatedContacts = [...oldContacts, ...newContacts];

    await writeContacts(updatedContacts);
    console.log(`Додано ${COUNT} нових контактів. Загальна кількість: ${updatedContacts.length}`);
  } catch (error) {
    console.error("Помилка при генерації контактів:", error.message);
  }
};

generateContacts();

export default generateContacts;

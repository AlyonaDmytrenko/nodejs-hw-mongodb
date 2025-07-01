import readline from "readline";
import generateContacts from "./scripts/generateContacts.js";
import addOneContact from "./scripts/addOneContact.js";
import getAllContacts from "./scripts/getAllContacts.js";
import countContacts from "./scripts/countContacts.js";
import removeLastContact from "./scripts/removeLastContact.js";
import removeAllContacts from "./scripts/removeAllContacts.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`1`);

rl.question("Введіть номер дії: ", async (answer) => {
  switch (answer.trim()) {
    case "1":
      await generateContacts();
      break;
    case "2":
      await addOneContact();
      break;
    case "3":
      await getAllContacts();
      break;
    case "4":
      await countContacts();
      break;
    case "5":
      await removeLastContact();
      break;
    case "6":
      await removeAllContacts();
      break;
    case "0":
      console.log("Вихід");
      rl.close();
      return;
    default:
      console.log("Невірна команда");
  }
  rl.close();
});


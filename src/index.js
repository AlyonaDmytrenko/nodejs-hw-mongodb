import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';



const PORT = process.env.PORT || 3000;

async function startApp() {
  await initMongoConnection();

  const app = setupServer();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startApp();

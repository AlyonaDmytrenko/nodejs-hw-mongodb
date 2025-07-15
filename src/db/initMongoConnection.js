import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_URL,
  MONGODB_DB
} = process.env;

export const initMongoConnection = async () => {
  if (!MONGODB_USER || !MONGODB_PASSWORD || !MONGODB_URL || !MONGODB_DB) {
    throw new Error('Missing MongoDB connection environment variables!');
  }

  const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  try {
<<<<<<< Updated upstream
    await mongoose.connect(uri); // ← без опцій
=======
    await mongoose.connect(uri); 
>>>>>>> Stashed changes
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection error:', error);
    process.exit(1);
  }
};

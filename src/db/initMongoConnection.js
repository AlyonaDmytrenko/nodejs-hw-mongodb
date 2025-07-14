// src/db/initMongoConnection.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.example' });

const { MONGODB_URL } = process.env;

export const initMongoConnection = async () => {
  if (!MONGODB_URL) {
    throw new Error('Missing MongoDB URI!');
  }

  try {
    await mongoose.connect(MONGODB_URL);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection error:', error);
    process.exit(1);
  }
};
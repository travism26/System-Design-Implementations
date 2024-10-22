import { app } from './app';
import mongoose from 'mongoose';

const start = async () => {
  const JWT_KEY = process.env.JWT_KEY || 'CHANGEMEASAP';
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:30010';
  if (!JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }

  process.on('SIGINT', () => {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  });
};

start();

import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log('Starting up...');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  // TODO: Add a config file to handle the environment variables
  // TODO: I might want to use postgres instead of mongo for the database
  // TODO: Going to try and use the hexagon architecture to separate the concerns
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();

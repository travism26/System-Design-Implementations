import { app } from './app';
import mongoose from 'mongoose';

const start = async () => {
  // JWT_KEY is used to sign the JWT tokens (used for authentication)
  const JWT_KEY = process.env.JWT_KEY || 'CHANGEMEASAP';
  // MONGO_URI is the URI of the MongoDB database
  // for local development, we use the node port service
  // I created a nodeport service in the same yaml file: infra/hotel-info-mongo-depl.yaml (local dev only)
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:30002';
  if (!JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });

  // Connect to MongoDB
  try {
    await mongoose.connect(MONGO_URI);
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

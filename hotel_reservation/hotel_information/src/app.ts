import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUser } from './middleware/current-user'; // This will be moved to common package eventually

import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middleware/error-handlers';

import { hotelRoutes } from './routes/hotelRoutes';
import { roomRoutes } from './routes/roomRoutes';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

// Middleware
app.use(currentUser);

// Routes
app.use(hotelRoutes);
app.use(roomRoutes);

// dummy check to see if the application is healthy (TODO: add actual health check)
app.get('/healthz', (req, res) => {
  console.log('Checking if the application is healthy');
  res.status(200).send('OK');
});

// dummy check to see if the database is connected (TODO: add actual health check)
app.get('/ready', (req, res) => {
  console.log('Checking if the database is ready');
  if (isDatabaseConnected()) {
    res.status(200).send('Ready');
  } else {
    res.status(503).send('Not Ready');
  }
});

function isDatabaseConnected() {
  return true; // This is just a placeholder for now.
}

// Catch all routes that are not defined
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };

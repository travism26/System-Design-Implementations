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

// Catch all routes that are not defined
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// Error handling middleware
app.use(errorHandler);

export { app };

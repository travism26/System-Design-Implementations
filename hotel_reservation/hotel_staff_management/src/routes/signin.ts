import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';
import {
  validateRequest,
  BadRequestError,
} from '@rickjms/microservices-common';

const router = express.Router();

router.post(
  '/api/auth/signin',

  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      console.log('Invalid credentials');
      throw new BadRequestError('Invalid credentials');
    }
    // Generate JWT
    // Might want to include the admin role in the JWT for future use
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };
    console.log('User signed in and JWT generated');
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// TODO: MOVE THIS TO A COMMON PACKAGE ASAP
// NOTE: this is the payload of the jwt and this might be moved to
// a common package later to be used across multiple services.
// just a temporary solution to get things going and to allow me to
// test if it actually works.

interface UserPayload {
  id: string;
  email: string;
  role: string;
}

// modify the existing Request interface
// by adding the currentUser property to it
// and assign it the value of the UserPayload interface
// we are doing this so that we can use the currentUser property
// in other middlewares
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if the jwt is not null, we will try to verify it
  // if it is not valid, we will send back null
  // if it is valid, we will send back the payload
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    // we are going to modify the existing req object
    // by adding the currentUser property to it
    // and assign it the value of the payload
    // we are doing this so that we can use the currentUser property
    // in other middlewares
    req.currentUser = payload;
  } catch (err) {
    res.send({ currentUser: null });
  }

  next();
};

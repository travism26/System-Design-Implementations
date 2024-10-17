import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      throw new NotAuthorizedError();
    }

    // Allow access if no specific roles are required
    // This is useful for routes that are open to all users
    if (requiredRoles.length === 0) {
      return next();
    }

    if (!requiredRoles.includes(req.currentUser.role)) {
      throw new NotAuthorizedError();
    }

    next();
  };
};

/*
  EXAMPLE USAGE:

  import { requireAuth } from '../middlewares/require-auth';

  router.get('/admin', requireAuth(['admin']), (req, res) => {
    res.send('Welcome, admin!');
  });

  router.get('/user', requireAuth(['user', 'admin']), (req, res) => {
    res.send('Welcome, user!');
  });

  router.get('/public', requireAuth([]), (req, res) => {
    res.send('Welcome, public!');
  });
*/

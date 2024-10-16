import express from 'express';

// Need to replace this will my own common package vs my template
import { currentUser } from '@rickjms/microservices-common';

const router = express.Router();

router.get('/api/auth/currentuser', currentUser, (req, res) => {
  console.log('req.currentUser', req.currentUser);
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };

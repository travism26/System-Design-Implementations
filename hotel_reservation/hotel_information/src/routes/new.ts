import { Router, Request, Response } from 'express';
import { Hotel } from '../domain/models/Hotel';
import { requireAuth } from '../middleware/require-auth';
import { BadRequestError } from '../errors/bad-request-error';

const router = Router();

router.post(
  '/v1/hotels',
  requireAuth(['hotel_staff', 'hotel_manager']),
  async (req: Request, res: Response) => {
    try {
      const { name, address, rooms, amenities } = req.body;

      if (!name || !address || !rooms || !amenities) {
        throw new BadRequestError('Missing required fields');
      }

      const newHotel = new Hotel({
        name,
        address,
        rooms,
        amenities,
      });

      await newHotel.save();

      res
        .status(201)
        .json({ message: 'Hotel created successfully', hotel: newHotel });
    } catch (error) {
      console.error('Error creating hotel:', error);
      if (error instanceof BadRequestError) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error creating hotel' });
    }
  }
);

export default router;

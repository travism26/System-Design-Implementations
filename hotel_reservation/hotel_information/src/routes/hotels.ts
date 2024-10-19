import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/require-auth';
import { Hotel } from '../domain/models/Hotel';
const router = Router();

// GET /v1/hotels/ID
router.get(
  '/v1/hotels/:id',
  requireAuth([]),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const hotel = await Hotel.findById(id);

      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }

      res.status(200).json(hotel);
    } catch (error) {
      console.error('Error fetching hotel:', error);
      res.status(500).json({ message: 'Error fetching hotel' });
    }
  }
);

// GET /v1/hotels
router.get(
  '/v1/hotels',
  requireAuth([]),
  async (req: Request, res: Response) => {
    try {
      const hotels = await Hotel.find();

      res.status(200).json(hotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      res.status(500).json({ message: 'Error fetching hotels' });
    }
  }
);

export default router;

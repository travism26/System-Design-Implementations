import { Router } from 'express';
import { requireAuth } from '../middleware/require-auth';
import { HotelController } from '../adapters/in/http/HotelController';
import { HotelUseCase } from '../application/use-cases/HotelUseCase';
import { MongooseHotelRepository } from '../adapters/out/persistence/MongooseHotelRepository';

const router = Router();

const hotelMongoRepository = new MongooseHotelRepository();
const hotelUseCase = new HotelUseCase(hotelMongoRepository);
const hotelController = new HotelController(hotelUseCase);

// POST /v1/hotels
router.post(
  '/v1/hotels',
  // requireAuth(['hotel_staff', 'hotel_manager']),
  hotelController.createHotel.bind(hotelController)
);

// GET /v1/hotels/:id
router.get(
  '/v1/hotels/:id',
  // requireAuth([]),
  hotelController.getHotel.bind(hotelController)
);

// GET /v1/hotels
router.get(
  '/v1/hotels',
  // requireAuth([]),
  hotelController.getAllHotels.bind(hotelController)
);

// DELETE /v1/hotels/:id
router.delete(
  '/v1/hotels/:id',
  requireAuth(['hotel_manager']),
  hotelController.deleteHotel.bind(hotelController)
);

export { router as hotelRoutes };
// useage: import { hotelRoutes } from './hotelRoutes';

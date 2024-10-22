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
  requireAuth(['hotel_staff', 'hotel_manager']),
  hotelController.createHotel.bind(hotelController)
);

export default router;

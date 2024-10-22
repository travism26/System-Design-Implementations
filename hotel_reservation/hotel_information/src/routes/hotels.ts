import { Router } from 'express';
import { requireAuth } from '../middleware/require-auth';
import { HotelController } from '../adapters/in/http/HotelController';
import { HotelUseCase } from '../application/use-cases/HotelUseCase';
import { MongooseHotelRepository } from '../adapters/out/persistence/MongooseHotelRepository';

const router = Router();

const hotelRepository = new MongooseHotelRepository();
// const postgreSqlHotelRepository = new PostgreSqlHotelRepository();

const hotelUseCase = new HotelUseCase(hotelRepository);

const hotelController = new HotelController(hotelUseCase);

// GET /v1/hotels/:id
router.get(
  '/v1/hotels/:id',
  requireAuth([]),
  hotelController.getHotel.bind(hotelController)
);

// GET /v1/hotels
router.get(
  '/v1/hotels',
  requireAuth([]),
  hotelController.getAllHotels.bind(hotelController)
);

export default router;

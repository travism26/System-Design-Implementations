import { Router } from 'express';
import { requireAuth } from '../middleware/require-auth';
import { RoomController } from '../adapters/in/http/RoomController';
import { RoomUseCase } from '../application/use-cases/RoomUseCase';
import { MongooseRoomRepository } from '../adapters/out/persistence/MongooseRoomRepository';

const router = Router();

const roomMongoRepository = new MongooseRoomRepository();
const roomUseCase = new RoomUseCase(roomMongoRepository);
const roomController = new RoomController(roomUseCase);

// GET /v1/rooms/:id
router.get(
  '/v1/rooms/:id',
  requireAuth([]),
  roomController.getRoomById.bind(roomController)
  // alt: (req, res, next) => roomController.getRoomById(req, res, next)
);

router.get(
  '/v1/rooms',
  requireAuth([]),
  roomController.getAllRooms.bind(roomController)
);

export { router as roomRoutes };

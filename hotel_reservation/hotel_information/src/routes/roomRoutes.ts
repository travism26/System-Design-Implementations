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
  // requireAuth([]),
  roomController.getRoomById.bind(roomController)
  // alt: (req, res, next) => roomController.getRoomById(req, res, next)
);

router.get(
  '/v1/rooms',
  // requireAuth([]),
  roomController.getAllRooms.bind(roomController)
);

// POST /v1/rooms
router.post(
  '/v1/rooms',
  requireAuth(['hotel_staff', 'hotel_manager']),
  roomController.createRoom.bind(roomController)
);

// PUT /v1/rooms/:id
router.put(
  '/v1/rooms/:id',
  requireAuth(['hotel_staff', 'hotel_manager']),
  roomController.updateRoom.bind(roomController)
);

// DELETE /v1/rooms/:id
router.delete(
  '/v1/rooms/:id',
  requireAuth(['hotel_manager']),
  roomController.deleteRoom.bind(roomController)
);

export { router as roomRoutes };

// src/adapters/in/http/RoomController.ts
import { Request, Response } from 'express';
import { RoomUseCase } from '../../../application/use-cases/RoomUseCase';

export class RoomController {
  constructor(private readonly roomUseCase: RoomUseCase) {}

  async getAllRooms(req: Request, res: Response) {
    const rooms = await this.roomUseCase.retrieveAllRooms();
    res.json(rooms);
  }

  async getRoomById(req: Request, res: Response) {
    const room = await this.roomUseCase.retrieveRoomDetails(req.params.room_id);
    res.json(room);
  }

  async createRoom(req: Request, res: Response) {
    await this.roomUseCase.registerNewRoom(req.body);
    res.status(201).send('Room created');
  }

  async updateRoom(req: Request, res: Response) {
    await this.roomUseCase.modifyRoomInformation(req.body);
    res.status(200).send('Room updated');
  }

  async deleteRoom(req: Request, res: Response) {
    await this.roomUseCase.removeRoomFromSystem(req.params.room_id);
    res.status(200).send('Room deleted');
  }
}

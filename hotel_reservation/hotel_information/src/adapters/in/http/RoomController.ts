// src/adapters/in/http/RoomController.ts
import { Request, Response } from 'express';
import {
  RetrieveRoomDetails,
  RegisterNewRoom,
  ModifyRoomInformation,
  RemoveRoomFromSystem,
} from '../../../application/use-cases/RoomUseCase';

export class RoomController {
  constructor(
    private retrieveRoomDetails: RetrieveRoomDetails,
    private registerNewRoom: RegisterNewRoom,
    private modifyRoomInformation: ModifyRoomInformation,
    private removeRoomFromSystem: RemoveRoomFromSystem
  ) {}

  async getRoomById(req: Request, res: Response) {
    const room = await this.retrieveRoomDetails.execute(req.params.room_id);
    res.json(room);
  }

  async createRoom(req: Request, res: Response) {
    await this.registerNewRoom.execute(req.body);
    res.status(201).send('Room created');
  }

  async updateRoom(req: Request, res: Response) {
    await this.modifyRoomInformation.execute(req.body);
    res.status(200).send('Room updated');
  }

  async deleteRoom(req: Request, res: Response) {
    await this.removeRoomFromSystem.execute(req.params.room_id);
    res.status(200).send('Room deleted');
  }
}

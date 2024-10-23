import { RoomRepository } from '../../ports/out/RoomRepository';
import { Room } from '../../domain/models/Room';

export class RoomUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  async retrieveAllRooms(): Promise<Room[]> {
    return this.roomRepository.findAllRooms();
  }

  async retrieveRoomDetails(roomId: string): Promise<Room | null> {
    return this.roomRepository.findRoomById(roomId);
  }

  async registerNewRoom(room: Room): Promise<Room> {
    return this.roomRepository.saveRoom(room);
  }

  async modifyRoomInformation(room: Room): Promise<Room> {
    return this.roomRepository.updateRoom(room);
  }

  async removeRoomFromSystem(roomId: string): Promise<boolean> {
    return this.roomRepository.deleteRoom(roomId);
  }
}

import { RoomRepository } from '../../ports/out/RoomRepository';
import { Room } from '../../domain/models/Room';

export class RoomUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  async retrieveRoomDetails(roomId: string) {
    return this.roomRepository.findRoomById(roomId);
  }

  async registerNewRoom(room: Room) {
    return this.roomRepository.saveRoom(room);
  }

  async modifyRoomInformation(room: Room) {
    return this.roomRepository.updateRoom(room);
  }

  async removeRoomFromSystem(roomId: string) {
    return this.roomRepository.deleteRoom(roomId);
  }
}

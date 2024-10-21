import { RoomRepository } from '../../ports/out/RoomRepository';
import { Room } from '../../domain/models/Room';

export class RetrieveRoomDetails {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(roomId: string) {
    return this.roomRepository.findRoomById(roomId);
  }
}

export class RegisterNewRoom {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(room: Room) {
    return this.roomRepository.saveRoom(room);
  }
}

export class ModifyRoomInformation {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(room: Room) {
    return this.roomRepository.updateRoom(room);
  }
}

export class RemoveRoomFromSystem {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(roomId: string) {
    return this.roomRepository.deleteRoom(roomId);
  }
}

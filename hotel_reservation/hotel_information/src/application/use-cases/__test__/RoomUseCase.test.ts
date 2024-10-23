import { RoomUseCase } from '../RoomUseCase';
import { RoomRepository } from '../../../ports/out/RoomRepository';
import { Room } from '../../../domain/models/Room';

// Mock the RoomRepository
jest.mock('../../../ports/out/RoomRepository');

describe('RoomUseCase', () => {
  let roomUseCase: RoomUseCase;
  let mockRoomRepository: jest.Mocked<RoomRepository>;

  const mockRoom: Room = {
    id: '1',
    roomTypeId: 'standard',
    floor: 2,
    number: '201',
    hotelId: 'hotel1',
    name: 'Standard Room 201',
    isAvailable: true,
  };

  beforeEach(() => {
    mockRoomRepository = {
      findAllRooms: jest.fn(),
      findRoomById: jest.fn(),
      saveRoom: jest.fn(),
      updateRoom: jest.fn(),
      deleteRoom: jest.fn(),
    } as jest.Mocked<RoomRepository>;

    roomUseCase = new RoomUseCase(mockRoomRepository);
  });

  describe('retrieveAllRooms', () => {
    it('should return all rooms', async () => {
      const mockRooms = [mockRoom];
      mockRoomRepository.findAllRooms.mockResolvedValue(mockRooms);

      const result = await roomUseCase.retrieveAllRooms();

      expect(result).toEqual(mockRooms);
      expect(mockRoomRepository.findAllRooms).toHaveBeenCalled();
    });
  });

  describe('retrieveRoomDetails', () => {
    it('should return room details for a given room id', async () => {
      mockRoomRepository.findRoomById.mockResolvedValue(mockRoom);

      const result = await roomUseCase.retrieveRoomDetails('1');

      expect(result).toEqual(mockRoom);
      expect(mockRoomRepository.findRoomById).toHaveBeenCalledWith('1');
    });

    it('should return null if room is not found', async () => {
      mockRoomRepository.findRoomById.mockResolvedValue(null);

      const result = await roomUseCase.retrieveRoomDetails('nonexistent');

      expect(result).toBeNull();
      expect(mockRoomRepository.findRoomById).toHaveBeenCalledWith(
        'nonexistent'
      );
    });
  });

  describe('registerNewRoom', () => {
    it('should save and return a new room', async () => {
      mockRoomRepository.saveRoom.mockResolvedValue(mockRoom);

      const result = await roomUseCase.registerNewRoom(mockRoom);

      expect(result).toEqual(mockRoom);
      expect(mockRoomRepository.saveRoom).toHaveBeenCalledWith(mockRoom);
    });
  });

  describe('modifyRoomInformation', () => {
    it('should update and return the modified room', async () => {
      const updatedRoom = { ...mockRoom, name: 'Updated Room 201' };
      mockRoomRepository.updateRoom.mockResolvedValue(updatedRoom);

      const result = await roomUseCase.modifyRoomInformation(updatedRoom);

      expect(result).toEqual(updatedRoom);
      expect(mockRoomRepository.updateRoom).toHaveBeenCalledWith(updatedRoom);
    });
  });

  describe('removeRoomFromSystem', () => {
    it('should delete the room and return true if successful', async () => {
      mockRoomRepository.deleteRoom.mockResolvedValue(true);

      const result = await roomUseCase.removeRoomFromSystem('1');

      expect(result).toBe(true);
      expect(mockRoomRepository.deleteRoom).toHaveBeenCalledWith('1');
    });

    it('should return false if room deletion fails', async () => {
      mockRoomRepository.deleteRoom.mockResolvedValue(false);

      const result = await roomUseCase.removeRoomFromSystem('nonexistent');

      expect(result).toBe(false);
      expect(mockRoomRepository.deleteRoom).toHaveBeenCalledWith('nonexistent');
    });
  });
});

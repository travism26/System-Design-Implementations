import { HotelUseCase } from '../HotelUseCase';
import { HotelRepository } from '../../../ports/out/HotelRepository';
import { Hotel } from '../../../domain/models/Hotel';

describe('HotelUseCase', () => {
  let hotelUseCase: HotelUseCase;
  let mockHotelRepository: jest.Mocked<HotelRepository>;

  beforeEach(() => {
    mockHotelRepository = {
      findAllHotels: jest.fn(),
      findHotelById: jest.fn(),
      saveHotel: jest.fn(),
      updateHotel: jest.fn(),
      deleteHotel: jest.fn(),
    };
    hotelUseCase = new HotelUseCase(mockHotelRepository);
  });

  describe('retrieveAllHotels', () => {
    it('should retrieve all hotels', async () => {
      const mockHotels: Hotel[] = [
        {
          id: '1',
          name: 'Hotel A',
          address: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            country: 'USA',
          },
          contactInfo: { phone: '555-1234', email: 'hotelA@example.com' },
          amenities: ['WiFi'],
        },
        {
          id: '2',
          name: 'Hotel B',
          address: {
            street: '456 Elm St',
            city: 'Othertown',
            state: 'NY',
            zipCode: '67890',
            country: 'USA',
          },
          contactInfo: { phone: '555-5678', email: 'hotelB@example.com' },
          amenities: ['Pool'],
        },
      ];
      mockHotelRepository.findAllHotels.mockResolvedValue(mockHotels);

      const result = await hotelUseCase.retrieveAllHotels();

      expect(result).toEqual(mockHotels);
      expect(mockHotelRepository.findAllHotels).toHaveBeenCalledTimes(1);
    });
  });

  describe('retrieveHotelDetails', () => {
    it('should retrieve hotel details by id', async () => {
      const mockHotel: Hotel = {
        id: '1',
        name: 'Hotel A',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          country: 'USA',
        },
        contactInfo: { phone: '555-1234', email: 'hotelA@example.com' },
        amenities: ['WiFi'],
      };
      mockHotelRepository.findHotelById.mockResolvedValue(mockHotel);

      const result = await hotelUseCase.retrieveHotelDetails('1');

      expect(result).toEqual(mockHotel);
      expect(mockHotelRepository.findHotelById).toHaveBeenCalledWith('1');
    });

    it('should return null for non-existent hotel', async () => {
      mockHotelRepository.findHotelById.mockResolvedValue(null);

      const result = await hotelUseCase.retrieveHotelDetails('999');

      expect(result).toBeNull();
      expect(mockHotelRepository.findHotelById).toHaveBeenCalledWith('999');
    });
  });

  describe('registerNewHotel', () => {
    it('should register a new hotel', async () => {
      const newHotel: Hotel = {
        id: '3',
        name: 'New Hotel',
        address: {
          street: '789 Oak St',
          city: 'Newtown',
          state: 'CA',
          zipCode: '54321',
          country: 'USA',
        },
        contactInfo: { phone: '555-9876', email: 'newhotel@example.com' },
        amenities: ['WiFi', 'Parking'],
      };
      mockHotelRepository.saveHotel.mockResolvedValue(newHotel);

      const result = await hotelUseCase.registerNewHotel(newHotel);

      expect(result).toEqual(newHotel);
      expect(mockHotelRepository.saveHotel).toHaveBeenCalledWith(newHotel);
    });
  });

  describe('modifyHotelInformation', () => {
    it('should modify hotel information', async () => {
      const updatedHotel: Hotel = {
        id: '1',
        name: 'Updated Hotel A',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          country: 'USA',
        },
        contactInfo: { phone: '555-1234', email: 'hotelA@example.com' },
        amenities: ['WiFi'],
      };
      mockHotelRepository.updateHotel.mockResolvedValue(updatedHotel);

      const result = await hotelUseCase.modifyHotelInformation(updatedHotel);

      expect(result).toEqual(updatedHotel);
      expect(mockHotelRepository.updateHotel).toHaveBeenCalledWith(
        updatedHotel
      );
    });
  });

  describe('removeHotelFromSystem', () => {
    it('should remove a hotel from the system', async () => {
      mockHotelRepository.deleteHotel.mockResolvedValue(true);

      const result = await hotelUseCase.removeHotelFromSystem('1');

      expect(result).toBe(true);
      expect(mockHotelRepository.deleteHotel).toHaveBeenCalledWith('1');
    });

    it('should return false if hotel deletion fails', async () => {
      mockHotelRepository.deleteHotel.mockResolvedValue(false);

      const result = await hotelUseCase.removeHotelFromSystem('999');

      expect(result).toBe(false);
      expect(mockHotelRepository.deleteHotel).toHaveBeenCalledWith('999');
    });
  });
});

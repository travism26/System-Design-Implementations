import { HotelRepository } from '../../ports/out/HotelRepository';
import { Hotel } from '../../domain/models/Hotel';

export class HotelUseCase {
  constructor(private readonly hotelRepository: HotelRepository) {}

  async retrieveAllHotels() {
    return this.hotelRepository.findAllHotels();
  }

  async retrieveHotelDetails(hotelId: string) {
    return this.hotelRepository.findHotelById(hotelId);
  }

  async registerNewHotel(hotel: Hotel) {
    return this.hotelRepository.saveHotel(hotel);
  }

  async modifyHotelInformation(hotel: Hotel) {
    return this.hotelRepository.updateHotel(hotel);
  }

  async removeHotelFromSystem(hotelId: string) {
    return this.hotelRepository.deleteHotel(hotelId);
  }
}

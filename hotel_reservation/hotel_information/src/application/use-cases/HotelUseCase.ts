import { HotelRepository } from '../../ports/out/HotelRepository';
import { Hotel } from '../../domain/models/Hotel';

export class RetrieveHotelDetails {
  constructor(private readonly hotelRepository: HotelRepository) {}

  async execute(hotelId: string) {
    return this.hotelRepository.findHotelById(hotelId);
  }
}

export class RegisterNewHotel {
  constructor(private readonly hotelRepository: HotelRepository) {}

  async execute(hotel: Hotel) {
    return this.hotelRepository.saveHotel(hotel);
  }
}

export class ModifyHotelInformation {
  constructor(private readonly hotelRepository: HotelRepository) {}

  async execute(hotel: Hotel) {
    return this.hotelRepository.updateHotel(hotel);
  }
}

export class RemoveHotelFromSystem {
  constructor(private readonly hotelRepository: HotelRepository) {}

  async execute(hotelId: string) {
    return this.hotelRepository.deleteHotel(hotelId);
  }
}

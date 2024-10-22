import { Request, Response } from 'express';
import { HotelUseCase } from '../../../application/use-cases/HotelUseCase';
import { Hotel } from '../../../domain/models/Hotel';

export class HotelController {
  constructor(private readonly hotelUseCase: HotelUseCase) {}

  async getAllHotels(req: Request, res: Response) {
    try {
      const hotels = await this.hotelUseCase.retrieveAllHotels();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getHotel(req: Request, res: Response) {
    try {
      const hotelId = req.params.hotel_id;
      const hotel = await this.hotelUseCase.retrieveHotelDetails(hotelId);
      res.json(hotel);
    } catch (error) {
      res.status(404).json({ message: 'Hotel not found' });
    }
  }

  async createHotel(req: Request, res: Response) {
    try {
      const hotelData: Hotel = req.body;
      const newHotel = await this.hotelUseCase.registerNewHotel(hotelData);
      res.status(201).json(newHotel);
    } catch (error) {
      res.status(400).json({ message: 'Invalid hotel data' });
    }
  }

  async updateHotel(req: Request, res: Response) {
    try {
      const hotelId = req.params.id;
      const hotelData: Hotel = { ...req.body, id: hotelId };
      const updatedHotel = await this.hotelUseCase.modifyHotelInformation(
        hotelData
      );
      res.json(updatedHotel);
    } catch (error) {
      res.status(404).json({ message: 'Hotel not found or invalid data' });
    }
  }

  async deleteHotel(req: Request, res: Response) {
    try {
      const hotelId = req.params.id;
      await this.hotelUseCase.removeHotelFromSystem(hotelId);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: 'Hotel not found' });
    }
  }
}

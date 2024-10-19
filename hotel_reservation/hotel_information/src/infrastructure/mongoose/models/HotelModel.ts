import mongoose, { Document, Schema } from 'mongoose';
import { Hotel } from '../../../domain/models/Hotel';

interface HotelDocument extends Document {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  amenities: string[];
}

interface HotelModel extends mongoose.Model<HotelDocument> {
  fromDomain(hotel: Hotel): HotelDocument;
  toDomain(document: HotelDocument): Hotel;
}

const HotelSchema = new Schema(
  {
    name: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      website: { type: String },
    },
    amenities: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    optimisticConcurrency: true,
    versionKey: 'version',
  }
);

HotelSchema.statics.fromDomain = function (hotel: Hotel): HotelDocument {
  const { id, ...hotelData } = hotel;
  return new this({
    _id: id ? new mongoose.Types.ObjectId(id) : new mongoose.Types.ObjectId(),
    ...hotelData,
  });
};

HotelSchema.statics.toDomain = function (document: HotelDocument): Hotel {
  return {
    id: document._id.toString(),
    name: document.name,
    address: document.address,
    contactInfo: document.contactInfo,
    amenities: document.amenities,
  };
};

const HotelModel = mongoose.model<HotelDocument, HotelModel>(
  'Hotel',
  HotelSchema
);

export const createHotel = async (hotel: Hotel): Promise<Hotel> => {
  const hotelDocument = HotelModel.fromDomain(hotel);
  await hotelDocument.save();
  return HotelModel.toDomain(hotelDocument);
};

export const getHotel = async (id: string): Promise<Hotel | null> => {
  const hotelDoc = await HotelModel.findById(id);
  return hotelDoc ? HotelModel.toDomain(hotelDoc) : null;
};

export { HotelModel };

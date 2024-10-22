import mongoose, { Document, Schema } from 'mongoose';
import { Room } from '../../../domain/models/Room';

interface RoomDocument extends Document {
  roomId: string;
  roomTypeId: string;
  floor: number;
  number: string;
  hotelId: mongoose.Types.ObjectId;
  name: string;
  isAvailable: boolean;
}

interface RoomModel extends mongoose.Model<RoomDocument> {
  fromDomain(room: Room): RoomDocument;
  toDomain(document: RoomDocument): Room;
}

const RoomSchema = new Schema(
  {
    roomId: { type: String, required: true, unique: true },
    roomTypeId: { type: String, required: true },
    floor: { type: Number, required: true },
    number: { type: String, required: true },
    hotelId: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
    name: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
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

RoomSchema.statics.fromDomain = function (room: Room): RoomDocument {
  const { id, hotelId, ...roomData } = room;
  return new this({
    _id: id ? new mongoose.Types.ObjectId(id) : new mongoose.Types.ObjectId(),
    hotelId: new mongoose.Types.ObjectId(hotelId),
    ...roomData,
  });
};

RoomSchema.statics.toDomain = function (document: RoomDocument): Room {
  return {
    id: document._id.toString(),
    roomTypeId: document.roomTypeId,
    floor: document.floor,
    number: document.number,
    hotelId: document.hotelId.toString(),
    name: document.name,
    isAvailable: document.isAvailable,
  };
};

const RoomModel = mongoose.model<RoomDocument, RoomModel>('Room', RoomSchema);

export const createRoom = async (room: Room): Promise<Room> => {
  const roomDocument = RoomModel.fromDomain(room);
  await roomDocument.save();
  return RoomModel.toDomain(roomDocument);
};

export const getRoom = async (id: string): Promise<Room | null> => {
  const roomDoc = await RoomModel.findById(id);
  return roomDoc ? RoomModel.toDomain(roomDoc) : null;
};

export { RoomModel };

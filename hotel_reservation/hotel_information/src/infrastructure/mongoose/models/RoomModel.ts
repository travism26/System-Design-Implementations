import mongoose, { Schema, Document } from 'mongoose';
import { Room } from '../../../domain/models/Room';

// Use the Room domain model to define the attributes
interface RoomAttrs extends Omit<Room, 'hotelId'> {
  hotelId: mongoose.Types.ObjectId;
}

// Omit the hotel_id from the Room domain model and add it to the Document
interface RoomDoc extends Omit<Room, 'id' | 'hotelId'>, Document {
  id: mongoose.Types.ObjectId;
  hotelId: mongoose.Types.ObjectId;
}

interface RoomModel extends mongoose.Model<RoomDoc> {
  build(attrs: RoomAttrs): RoomDoc;
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

// Update the build function to use RoomModelAttrs
RoomSchema.statics.build = (attrs: RoomAttrs): RoomDoc => {
  return new RoomModel(attrs);
};

// Update the toDomainModel method
RoomSchema.methods.toDomainModel = function (): Room {
  return {
    id: this._id.toString(),
    roomTypeId: this.roomTypeId,
    floor: this.floor,
    number: this.number,
    hotelId: this.hotelId.toString(),
    name: this.name,
    isAvailable: this.isAvailable,
  };
};

export const RoomModel = mongoose.model<RoomDoc, RoomModel>('Room', RoomSchema);

// Update the createRoomModel function
export const createRoomModel = (room: RoomAttrs): RoomDoc => {
  return RoomModel.build(room);
};

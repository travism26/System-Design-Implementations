import mongoose, { Schema, Document } from 'mongoose';

interface RoomAttrs {
  room_id: string;
  room_type_id: string;
  floor: number;
  number: string;
  hotel_id: mongoose.Types.ObjectId;
  name: string;
  is_available: boolean;
}

interface RoomDoc extends Document {
  room_id: string;
  room_type_id: string;
  floor: number;
  number: string;
  hotel_id: mongoose.Types.ObjectId;
  name: string;
  is_available: boolean;
}

interface RoomModel extends mongoose.Model<RoomDoc> {
  build(attrs: RoomAttrs): RoomDoc;
}

const RoomSchema = new Schema(
  {
    room_id: { type: String, required: true, unique: true },
    room_type_id: { type: String, required: true },
    floor: { type: Number, required: true },
    number: { type: String, required: true },
    hotel_id: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
    name: { type: String, required: true },
    is_available: { type: Boolean, default: true },
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

// build function for Room
RoomSchema.statics.build = (attrs: RoomAttrs) => {
  return new Room(attrs);
};

export const Room = mongoose.model<RoomDoc, RoomModel>('Room', RoomSchema);

import { DateTime } from 'luxon';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TrackingDocument = HydratedDocument<Tracking>;

@Schema()
export class Tracking {
  _id: string;

  @Prop({
    required: true,
    type: String,
  })
  keyword: string;

  @Prop({
    type: [Number],
    default: [],
  })
  searchChannels: number[];

  @Prop({
    type: Number,
    default: 1,
    enum: [1, 2, 3],
  })
  status: number;

  @Prop({
    default: DateTime.now().toJSDate(),
  })
  createdAt: Date;

  @Prop({
    default: DateTime.now().toJSDate(),
  })
  updatedAt: Date;
}

export const TrackingSchema = SchemaFactory.createForClass(Tracking);

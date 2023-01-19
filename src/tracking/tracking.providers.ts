import { Mongoose } from 'mongoose';
import { TrackingSchema } from './schemas/tracking.schema';

export const trackingProviders = [
  {
    provide: 'TRACKING_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Tracking', TrackingSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
//

import { Module } from '@nestjs/common';
import { DateTime } from 'luxon';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { Tracking, TrackingSchema } from './schemas/tracking.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Tracking.name,
        useFactory: () => {
          const schema = TrackingSchema;

          schema.pre('save', function (next) {
            this.updatedAt = DateTime.now().toJSDate();
            next();
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class TrackingModule {}

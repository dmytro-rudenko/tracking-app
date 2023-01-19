import { Module } from '@nestjs/common';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { trackingProviders } from './tracking.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TrackingController],
  providers: [TrackingService, ...trackingProviders],
})
export class TrackingModule {}

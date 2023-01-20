import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingModule } from './tracking/tracking.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/tracking'),
    TrackingModule,
  ],
})
export class AppModule {}

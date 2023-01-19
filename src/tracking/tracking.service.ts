import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TrackingDto } from './dto/tracking.dto';
import { Tracking } from './interfaces/tracking.interface';

@Injectable()
export class TrackingService {
  constructor(
    @Inject('TRACKING_MODEL') private readonly trackingModel: Model<Tracking>,
  ) {}

  async create(createTrackingDto: TrackingDto): Promise<Tracking> {
    const createdTracking = this.trackingModel.create(createTrackingDto);
    return createdTracking;
  }

  async findAll(
    query: object,
    skip: number,
    limit: number,
  ): Promise<Tracking[]> {
    return this.trackingModel.find(query).skip(skip).limit(limit).exec();
  }

  async findOne(id: string): Promise<Tracking> {
    return this.trackingModel.findById(id).exec();
  }

  async update(id: string, updateTrackingDto: TrackingDto): Promise<Tracking> {
    return this.trackingModel.findByIdAndUpdate(id, updateTrackingDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<Tracking> {
    return this.trackingModel.findByIdAndRemove(id);
  }
}

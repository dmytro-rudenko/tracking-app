import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tracking, TrackingDocument } from './schemas/tracking.schema';
import { TrackingDto } from './dto/tracking.dto';

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel(Tracking.name)
    private readonly trackingModel: Model<TrackingDocument>,
  ) {}

  async create(createTrackingDto: TrackingDto): Promise<Tracking> {
    const createdTracking = this.trackingModel.create(createTrackingDto);
    return createdTracking;
  }

  async findAll(
    query: object,
    sort: number,
    skip: number,
    limit: number,
  ): Promise<Tracking[]> {
    return this.trackingModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: sort })
      .exec();
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

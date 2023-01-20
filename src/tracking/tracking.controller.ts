import {
  Controller,
  Param,
  Query,
  Get,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { TrackingDto, ListAllEntities } from './dto';
import { TrackingService } from './tracking.service';
import { Tracking } from './schemas/tracking.schema';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  async create(@Body() createTracingDto: TrackingDto) {
    return this.trackingService.create(createTracingDto);
  }

  @Get()
  async findAll(@Query() params: ListAllEntities): Promise<Tracking[]> {
    const query = {};

    if (params.status) {
      query['status'] = params.status;
    }

    return this.trackingService.findAll(
      query,
      params.sort || 1,
      params.skip || 0,
      params.limit || 100,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tracking> {
    return this.trackingService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackingDto: TrackingDto,
  ): Promise<Tracking> {
    return this.trackingService.update(id, updateTrackingDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Tracking> {
    return this.trackingService.delete(id);
  }
}

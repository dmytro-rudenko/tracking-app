import { Test, TestingModule } from '@nestjs/testing';
import { DateTime } from 'luxon';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { Tracking, TrackingSchema } from './schemas/tracking.schema';

describe('Tracking', () => {
  let trackingController: TrackingController;
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/tracking'),
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
    }).compile();

    trackingController = app.get<TrackingController>(TrackingController);
  });

  afterAll(async () => {
    const trackingItems = await trackingController.findAll({});

    for (const trackingItem of trackingItems) {
      await trackingController.delete(trackingItem._id);
    }

    await app.close();
  });

  describe('controller', () => {
    let createdTracking: Tracking, foundTracking: Tracking;

    const data = {
      keyword: 'test',
      searchChannels: [1],
      status: 1,
    };

    it('should create item', async () => {
      [createdTracking] = await Promise.all([
        trackingController.create(data),
        trackingController.create(data),
      ]);

      expect(createdTracking).toHaveProperty('_id');
      expect(createdTracking).toHaveProperty('keyword', data.keyword);
      expect(createdTracking).toHaveProperty(
        'searchChannels',
        data.searchChannels,
      );
      expect(createdTracking).toHaveProperty('status', data.status);
    });

    it('should find single item', async () => {
      foundTracking = await trackingController.findOne(createdTracking._id);

      expect(foundTracking).toHaveProperty('_id');
      expect(foundTracking).toHaveProperty('keyword', data.keyword);
      expect(foundTracking).toHaveProperty(
        'searchChannels',
        data.searchChannels,
      );
      expect(foundTracking).toHaveProperty('status', data.status);
    });

    it('should update item', async () => {
      const updatedTracking = await trackingController.update(
        createdTracking._id,
        {
          keyword: 'test2',
          searchChannels: [1, 2],
          status: 2,
        },
      );

      expect(updatedTracking).toHaveProperty('_id');
      expect(updatedTracking).toHaveProperty('keyword', 'test2');
      expect(updatedTracking).toHaveProperty('searchChannels', [1, 2]);
      expect(updatedTracking).toHaveProperty('status', 2);
    });

    it('should find all items', async () => {
      const foundTrackings = await trackingController.findAll({});

      expect(foundTrackings).toHaveLength(2);
    });

    it('should find list of items by status', async () => {
      const foundTrackings = await trackingController.findAll({
        status: 2,
      });

      expect(foundTrackings).toHaveLength(1);

      expect(foundTrackings[0]).toHaveProperty('_id');
      expect(foundTrackings[0]).toHaveProperty('keyword', 'test2');
      expect(foundTrackings[0]).toHaveProperty('searchChannels', [1, 2]);
      expect(foundTrackings[0]).toHaveProperty('status', 2);
    });

    it('should delete item', async () => {
      const deletedTracking = await trackingController.delete(
        createdTracking._id,
      );

      expect(deletedTracking).toHaveProperty('_id');

      const [foundTrackings, notFoundTracking] = await Promise.all([
        trackingController.findAll({}),
        trackingController.findOne(createdTracking._id),
      ]);

      expect(foundTrackings).toHaveLength(1);
      expect(notFoundTracking).toBeNull();
    });
  });
});

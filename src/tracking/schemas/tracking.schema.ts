import * as mongoose from 'mongoose';

export const TrackingSchema = new mongoose.Schema({
  keyword: String,
  searchChannels: {
    type: [Number],
    default: [1, 2],
  },
  status: {
    type: Number,
    default: 0,
    enum: [0, 1, 2],
  },

  createdAt: {
    type: Number,
    default: Date.now,
  },
  updatedAt: {
    type: Number,
    default: Date.now,
  },
});

TrackingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();

  next();
});

import { Document } from 'mongoose';

export interface Tracking extends Document {
  readonly keyword: string;
  readonly searchChannels: number[];
  readonly status: number;
}
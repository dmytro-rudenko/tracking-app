import * as mongoose from 'mongoose';

mongoose.set('strictQuery', false);

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost:27017/tracking'),
  },
];

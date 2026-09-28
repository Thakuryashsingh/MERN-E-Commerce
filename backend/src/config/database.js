import mongoose from 'mongoose';
import { config } from './config.js';

export async function connectDatabase() {
  if (!config.MONGODB_URI) throw new Error('MONGODB_URI is required');
  await mongoose.connect(config.MONGODB_URI);
  console.log('Connected to MongoDB');
}

import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/database.js';
import { config } from './config/config.js';

const port = config.PORT || 5000;
try {
  if (!config.ACCESS_TOKEN_SECRET || !config.REFRESH_TOKEN_SECRET) throw new Error('Add ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET to backend/.env');
  await connectDatabase();
  app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
} catch (error) {
  console.error('Could not start API:', error.message);
  process.exit(1);
}

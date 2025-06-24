import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;

// Initialize Prisma client
export const prisma = new PrismaClient();

// Initialize Redis client
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
export const redisClient = createClient({ url: redisUrl });

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected');
  } catch (error) {
    console.error('Redis connection error:', error);
  }
})();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import bandRoutes from './routes/band.routes';
import availabilityRoutes from './routes/availability.routes';
import rehearsalRoutes from './routes/rehearsal.routes';
import setlistRoutes from './routes/setlist.routes';
import songRoutes from './routes/song.routes';
import notificationRoutes from './routes/notification.routes';

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bands', bandRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/rehearsals', rehearsalRoutes);
app.use('/api/setlists', setlistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/notifications', notificationRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Rehearsal Scheduler API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      bands: '/api/bands',
      availability: '/api/availability',
      rehearsals: '/api/rehearsals',
      setlists: '/api/setlists',
      songs: '/api/songs',
      notifications: '/api/notifications'
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle process termination
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  await redisClient.disconnect();
  process.exit(0);
});

export default app;
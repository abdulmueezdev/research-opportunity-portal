import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { opportunityRoutes } from './routes/opportunity.routes.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin)) return cb(null, true);
    cb(null, origin === env.FRONTEND_ORIGIN);
  },
  credentials: true,
}));

app.use(express.json({ limit: '100kb' }));

app.use('/api/opportunities', opportunityRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

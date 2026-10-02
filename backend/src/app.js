import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';

const app = express();

app.use(cors({
  origin: env.FRONTEND_ORIGIN,
  credentials: true,
}));

app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;

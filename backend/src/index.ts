import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import userRouter from './routes/users';
import courseRouter from './routes/courses';
import gradeRouter from './routes/grades';
import mongoose from 'mongoose';
import { metricsMiddleware, updateDatabaseStatus, register } from './metrics';
var cors = require('cors');

const mongoUri = process.env.MONGO_URI || 'mongodb://progr:progr@localhost:27017/fakeNeptun?authSource=admin';
mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  updateDatabaseStatus(true);
  console.log('MongoDB connected');
});
mongoose.connection.on('disconnected', () => {
  updateDatabaseStatus(false);
  console.log('MongoDB disconnected');
});

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: 'POST,GET,PUT,OPTIONS,DELETE',
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(metricsMiddleware);

app.get('/metrics', async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.use('/api', [userRouter, courseRouter, gradeRouter]);

app.get('/health', (req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  };
  res.status(200).json(healthcheck);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

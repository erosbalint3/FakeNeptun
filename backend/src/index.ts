import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import userRouter from './routes/users';
import courseRouter from './routes/courses';
import gradeRouter from './routes/grades';
import mongoose from 'mongoose';
var cors = require('cors');

mongoose.connect('mongodb://progr:progr@localhost:27017/fakeNeptun?authSource=admin');

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
app.use('/api', [userRouter, courseRouter, gradeRouter]);

// Health check endpoint
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

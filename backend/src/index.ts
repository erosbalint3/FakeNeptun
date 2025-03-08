import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import userRouter from './routes/users';
import courseRouter from './routes/courses';
import mongoose from 'mongoose';
var cors = require('cors');

mongoose.connect('mongodb://progr:progr@localhost:27017');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: true,
  credentials: true,
  methods: 'POST,GET,PUT,OPTIONS,DELETE'
}));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/api", [userRouter, courseRouter]);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
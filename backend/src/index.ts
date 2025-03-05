import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import router from './routes/users';
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
app.use("/api", router);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
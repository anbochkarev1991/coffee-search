import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

// Routers import
import indexRouter from './routes/index.js';
import cafesRouter from './routes/cafes.js';

const port = process.env.PORT ?? 3001;
const app = express();

mongoose.connect('mongodb://localhost:27017/coffee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(express.json());
app.use(morgan('dev'));

// Routers
app.use('/api/', indexRouter);
app.use('/api/cafes', cafesRouter);

app.listen(port, () => {
  console.log('Server is up on port', port);
});

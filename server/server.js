import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import session from 'express-session';
import sessionStorage from 'session-file-store';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongodb from 'mongodb'

// Routers import
import indexRouter from './routes/index.js';
import signupRouter from './routes/signup.js';
import loginRouter from './routes/login.js';
import logoutRouter from './routes/logout.js';

dotenv.config();
const MongoClient =mongodb.MongoClient;
const saltRounds = 10;
const FileStore = sessionStorage(session);
const { connect } = mongoose;
const port = process.env.PORT ?? 3001;
const app = express();

// connect('mongodb://localhost:27017/coffee', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });


const uri = `mongodb+srv://coffee-search-admin:${process.env.CLUSTER_PASSWORD}@cluster0.egtos.mongodb.net/cofee-search?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.use(express.json());
app.use(morgan('dev'));

app.use(session({
  store: new FileStore(),
  key: 'user_sid',
  secret: bcrypt.hash(process.env.SECRET_PHRASE, saltRounds),
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(253402300000000),
  }
}));

// Routers
app.use('/api/', indexRouter);
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);

app.use((req, res, next) => {
  res.locals.isAuth = !!req.session.user;
  if (req.session.user) {
    res.locals.userName = req.session.user.login;
  }
});

app.use('/api/logout', loginRouter);

app.listen(port, () => {
  console.log('Server is up on port', port);
});

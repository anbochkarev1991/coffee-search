import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import session from 'express-session';
import sessionStorage from 'session-file-store';
import dotenv from 'dotenv';

// Routers import
import indexRouter from './routes/index.js';
import signupRouter from './routes/signup.js';
import loginRouter from './routes/login.js';
import logoutRouter from './routes/logout.js';
import cafesRouter from './routes/cafes.js';
import usersRouter from './routes/users.js';
import eventsRouter from './routes/events.js';

dotenv.config();
const saltRounds = 10;
const FileStore = sessionStorage(session);
const { connect } = mongoose;
const port = process.env.PORT ?? 3001;
const app = express();

connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  function (err) {
    if (err) throw err;
    console.log('БД подключена');
  },
);

app.use(express.json());
app.use(morgan('dev'));

app.use(
  session({
    store: new FileStore(),
    key: 'user_sid',
    secret: 'knfjdnijfnisndfijnijdqniwe',
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: new Date(253402300000000),
    },
  }),
);

// Routers
app.use('/api/', indexRouter);
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);

// app.use((req, res, next) => {
//   res.locals.isAuth = !!req.session.user;
//   if (req.session.user) {
//     res.locals.userName = req.session.user.login;
//   }
// });

app.use('/api/logout', logoutRouter);
app.use('/api/cafes', cafesRouter);

app.use((err, req, res, next) => {
  console.log(err)
})

app.listen(port, () => {
  console.log('Server is up on port', port);
});

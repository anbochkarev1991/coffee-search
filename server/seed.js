import mongoose from 'mongoose';
import Cafe from './models/cafe.js';
import User from './models/user.js';
import dotenv from 'dotenv';

const { connect, disconnect } = mongoose;
dotenv.config();


connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

async function seed() {
  const cafe = [
    new Cafe({
      name: 'Bro.We',
      latitude: 55.73443,
      longitude: 37.638413,
      rating: 5,
    }),
    new Cafe({
      name: 'Кооператив Чёрный',
      latitude: 55.760145,
      longitude: 37.65178,
      rating: 5,
    }),
    new Cafe({
      name: 'Правда кофе',
      latitude: 55.760099,
      longitude: 37.584559,
      rating: 4.4,
    }),
    new Cafe({
      name: 'ДаблБи',
      latitude: 55.735576,
      longitude: 37.634811,
      rating: 4.3,
    }),
    new Cafe({
      name: 'Skuratov Coffee',
      latitude: 55.754836,
      longitude: 37.60151,
      rating: 4.4,
    }),
  ];

  const users = [
    new User({
      login: 'qwe',
      email: 'qwe@qwe.ru',
      password: 'qweqwe',
    }),
    new User({
      login: 'asd',
      email: 'asd@asd.ru',
      password: 'asdasd',
    }),
    new User({
      login: 'zxc',
      email: 'zxc@zxc.ru',
      password: 'zxczxc',
    }),
  ];

  await Cafe.insertMany(cafe);
  await User.insertMany(users);

  disconnect();
}

seed();

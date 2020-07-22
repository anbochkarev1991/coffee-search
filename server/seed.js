import mongoose from 'mongoose';
import Cafe from './models/cafe.js';
import User from './models/user.js';
import Event from './models/event.js';
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
      address: 'Москва, Татарская улица, 5с1',
      latitude: 55.73443,
      longitude: 37.638413,
    }),
    new Cafe({
      name: 'Кооператив Чёрный',
      address: 'Москва, Лялин переулок, 5с1',
      latitude: 55.760145,
      longitude: 37.65178,
    }),
    new Cafe({
      name: 'Правда кофе',
      address: 'Москва, Садовая-Кудринская улица, 3А',
      latitude: 55.760099,
      longitude: 37.584559,
    }),
    new Cafe({
      name: 'ДаблБи',
      address: 'Москва, улица Бахрушина, 12с2',
      latitude: 55.735576,
      longitude: 37.634811,
    }),
    new Cafe({
      name: 'Skuratov Coffee',
      address: 'Москва, Калашный переулок, 5',
      latitude: 55.754836,
      longitude: 37.60151,
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

  const events = [
    new Event({
      title: 'Мастер класс по капучинно',
      body:
        'Бариста призер чемпионатов покажет каждому как варить, местпа ограничены - только 15 человек',
      location: '5f12c5019632fa02e5660e56',
      author: '5f12f7841134550a6f4939fa',
    }),
    new Event({
      title: 'Мастер класс по спаггети',
      body:
        'Шеф-повар покажет каждому как варить, места ограничены - только 12 человек',
      location: '5f12c5019632fa02e5660e5a',
      author: '5f142219cda6ce4d7e7b9d61',
    }),
    new Event({
      title: 'День Рождение бариста Толика',
      body:
        'Наш красава Толик принимает поздравления от друзей кофейни и угощает всех особенным эспрессо',
      location: '5f12c5019632fa02e5660e56',
      author: '5f142219cda6ce4d7e7b9d61',
    }),
  ];

  await Cafe.insertMany(cafe);
  // await User.insertMany(users);
  // await Event.insertMany(events);

  disconnect();
}

seed();

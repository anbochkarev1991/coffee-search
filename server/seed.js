import mongoose from 'mongoose';
import Cafe from './models/cafe.js';
import User from './models/user.js';
import Event from './models/event.js';
import Menu from './models/menu.js';
import Barista from './models/barista.js';
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
  // const cafe = [
  //   new Cafe({
  //     name: 'Bro.We',
  //     latitude: 55.73443,
  //     longitude: 37.638413,
  //     rating: 5,
  //   }),
  //   new Cafe({
  //     name: 'Кооператив Чёрный',
  //     latitude: 55.760145,
  //     longitude: 37.65178,
  //     rating: 5,
  //   }),
  //   new Cafe({
  //     name: 'Правда кофе',
  //     latitude: 55.760099,
  //     longitude: 37.584559,
  //     rating: 4.4,
  //   }),
  //   new Cafe({
  //     name: 'ДаблБи',
  //     latitude: 55.735576,
  //     longitude: 37.634811,
  //     rating: 4.3,
  //   }),
  //   new Cafe({
  //     name: 'Skuratov Coffee',
  //     latitude: 55.754836,
  //     longitude: 37.60151,
  //     rating: 4.4,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Introvert place',
  //     address: 'Москва, Мясницкая ул.б 41В',
  //     latitude: 55.768056,
  //     longitude: 37.642608,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'ABC Coffee Roasters',
  //     address: 'Москва, Ордынский тупик, 4',
  //     latitude: 55.741166,
  //     longitude: 37.623266,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'LES',
  //     address: 'Москва, Зубовский бул., 2с5',
  //     latitude: 55.736802,
  //     longitude: 37.594324,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Salute coffee',
  //     address: 'Москва, Страстной бульвар, 12с5',
  //     latitude: 55.766942,
  //     longitude: 37.612506,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Циники',
  //     address: 'Москва, Богословский переулок, 8/15с1',
  //     latitude: 55.762565,
  //     longitude: 37.599554,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'КК 12/10',
  //     address: 'Москва, Кривоколенный переулок, 12с10',
  //     latitude: 55.761910,
  //     longitude: 37.635767,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Прогресс',
  //     address: 'Москва, Садовая-Триумфальная улица, 4/10',
  //     latitude: 55.770702, 
  //     longitude: 37.599970,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Cezve Coffee',
  //     address: 'Москва, Крымская набережная, вл2',
  //     latitude: 55.734145,  
  //     longitude: 37.605550,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Nude',
  //     address: 'Москва, Спиридоньевский переулок, 1/24',
  //     latitude: 55.761808,  
  //     longitude: 37.592860,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Школьник',
  //     address: 'Москва, улица Земляной Вал, 12/7с1',
  //     latitude: 55.761737,  
  //     longitude: 37.656828,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Человек и Пароход',
  //     address: 'Москва, Мытная улица, 74',
  //     latitude: 55.712160, 
  //     longitude: 37.621062,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Brrrew!',
  //     address: 'Москва, Бакунинская улица, 8',
  //     latitude: 55.773238,  
  //     longitude: 37.680770,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Milk & Beans',
  //     address: 'Москва, Мичуринский проспект, 5',
  //     latitude: 55.702906,   
  //     longitude: 37.511508,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Vm Café',
  //     address: 'Москва, проспект Мира, 119с516',
  //     latitude: 55.829992,   
  //     longitude: 37.619953,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Camera Obscura',
  //     address: 'Москва, 1-й Тверской-Ямской переулок, 11',
  //     latitude: 55.773090,   
  //     longitude: 37.597317,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Ride the coffee',
  //     address: 'Москва, Оружейный переулок, 5',
  //     latitude: 55.771557,   
  //     longitude: 37.598403,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Stim',
  //     address: 'Санкт-Петербург, Гражданская улица, 13-15',
  //     latitude: 59.928145,    
  //     longitude: 30.312392,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Характер кофе',
  //     address: 'Санкт-Петербург, набережная реки Фонтанки, 109',
  //     latitude: 59.922894,     
  //     longitude: 30.318746,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Пиф-паф',
  //     address: 'Санкт-Петербург, набережная канала Грибоедова, 31',
  //     latitude: 59.932012,      
  //     longitude: 30.323564,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Mad Espresso Team',
  //     address: 'Санкт-Петербург, 2-я Советская улица, 27/2',
  //     latitude: 59.930245,       
  //     longitude: 30.372443,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'ДаблБи',
  //     address: 'Санкт-Петербург, Владимирский проспект, 5',
  //     latitude: 59.931145,        
  //     longitude: 30.347605,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Больше кофе!',
  //     address: 'Санкт-Петербург, Александровский парк, 3Г',
  //     latitude: 59.954484,        
  //     longitude: 30.320629,
  //   }),
  //   new Cafe({
  //     rating: [],
  //     name: 'Espresso Bike',
  //     address: 'Санкт-Петербург, Казанская улица, 7',
  //     latitude: 59.932378,         
  //     longitude: 30.321042,
  //   }),
  // ];

  // const users = [
  //   new User({
  //     login: 'qwe',
  //     email: 'qwe@qwe.ru',
  //     password: 'qweqwe',
  //   }),
  //   new User({
  //     login: 'asd',
  //     email: 'asd@asd.ru',
  //     password: 'asdasd',
  //   }),
  //   new User({
  //     login: 'zxc',
  //     email: 'zxc@zxc.ru',
  //     password: 'zxczxc',
  //   }),

  // ];

  // const events = [
  //   new Event({
  //     title: 'Мастер класс по капучинно',
  //     body: 'Бариста призер чемпионатов покажет каждому как варить, местпа ограничены - только 15 человек',
  //     location: '5f17f1748408460b5351c9a2',
  //     author: '5f142219cda6ce4d7e7b9d61',

  //   }),
  //   new Event({
  //     title: 'Мастер класс по спаггети',
  //     body: 'Шеф-повар покажет каждому как варить, места ограничены - только 12 человек',
  //     location: '5f17f1748408460b5351c9a6',
  //     author: '5f142219cda6ce4d7e7b9d61',

  // }),
  // new Event({
  //   title: 'День Рождение бариста Толика',
  //   body: 'Наш красава Толик принимает поздравления от друзей кофейни и угощает всех особенным эспрессо',
  //   location: '5f12c5019632fa02e5660e56',
  //   author: '5f142219cda6ce4d7e7b9d61',
  // })
  // ]

  // const menu = [
  //   new Menu({
  //     goods: 'Espresso',
  //     cost: 150,
  //     size: 0.4,
  //     location: '5f17f1748408460b5351c9a2',
  //   }),
  //   new Menu({
  //     goods: 'Americano',
  //     cost: 120,
  //     size: 0.6,
  //     location: '5f17f1748408460b5351c9a2',
  //   }),
  //   new Menu({
  //     goods: 'Espresso',
  //     cost: 140,
  //     size: 0.4,
  //     location: '5f17f1748408460b5351c9a6',
  //   })
  // ]

  const barista = [
    // new Barista({
    //   name: 'Анатолий',
    //   about: 'Креативщик и альтернативщик всегда варит не просто кофе, а хорошее настроение и заряд позитива',
    //   photo: 'https://coffee-search-elbrus-project.s3.eu-central-1.amazonaws.com/barista/photo_2020-07-22_18-38-12.jpg',
    //   location: '5f183633e0b8dd19adbb908f',
    // }),
    // new Barista({
    //   name: 'Марина',
    //   about: 'Богиня эспрессо, выпускает пар не только в кофемашине',
    //   photo: 'https://coffee-search-elbrus-project.s3.eu-central-1.amazonaws.com/barista/photo_2020-07-22_18-38-07.jpg',
    //   location: '5f183633e0b8dd19adbb908f',
    // }),
    new Barista({
      name: 'Полина - сестра Марины',
      about: 'Богиня капучинно, хранитель вашего настроения',
      photo: 'https://coffee-search-elbrus-project.s3.eu-central-1.amazonaws.com/barista/photo_2020-07-22_18-38-07.jpg',
      location: '5f183633e0b8dd19adbb9092',
    }),
  ]

  // await Cafe.insertMany(cafe);
  // await User.insertMany(users);
  // await Event.insertMany(events);
  // await Menu.insertMany(menu)
  await Barista.insertMany(barista);
  disconnect();
}

seed();

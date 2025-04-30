require('dotenv').config();
const { port } = require('config');
const { router: usersRouter } = require('./routes/users.js');
const { router: itemsRouter } = require('./routes/items.js')
const { router: ordersRouter } = require('./routes/orders.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const isProd = process.env.NODE_ENV === 'production';
const express = require('express');
const server = express();


server.use(cors(
  {
    origin: isProd ? 'https://hobby-art-vue.vercel.app' : 'http://localhost:8080',
    credentials: true,
  }
));
server.use(cookieParser());

server.listen(port, (req, resp) => {
  server.get('/', (req, res) => {
    res.send('hello world')
  })
  console.log(`Server started on port ${port}`)
});

const jsonBodyParser = express.json();
server.use(jsonBodyParser);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/', usersRouter);
server.use('/api/items', itemsRouter);
server.use('/api/orders', ordersRouter);


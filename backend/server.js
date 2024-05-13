require('dotenv').config();
const { port } = require('config');
const { router: pageRouter } = require('./routes/pages.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')

const express = require('express');
const server = express();
// console.log(path.join(__dirname, '..', 'frontend', 'dist'))
// server.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8080/'); // Разрешаем доступ со всех доменов
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Разрешаем различные HTTP методы
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Разрешаем различные заголовки
//   res.header("Content-Type", "application/json;charset=utf-8");
//   res.header ("Access-Control-Allow-Credentials", true);
//
//   next();
//
// });


server.listen(port, (req, resp) => {
  server.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname,'..', 'frontend', 'dist', 'index.html'));
    res.send('hello world')
  })
  console.log(`Server started on port ${port}`)
});

server.use(cors());
server.use(cookieParser());



const jsonBodyParser = express.json();
server.use(jsonBodyParser);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/', pageRouter);


require('dotenv').config();
const { port } = require('config');
const { router: pageRouter } = require('./routes/pages.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')

const express = require('express');
const server = express();

server.listen(port, (req, resp) => {
  server.get('/', (req, res) => {
    res.send('hello world')
  })
  console.log(`Server started on port ${port}`)
});
// server.use(cors({
//   origin: 'http://localhost:8080',
//   credentials: true
// }));
server.use(cors());
// server.get('/set-cookie', (req, res) => {
//   res.cookie('testCookie', 'testValue', {
//     httpOnly: true,
//     secure: false,
//     sameSite: 'lax'
//   });
//   res.send('Cookie is set');
// });
server.use(cookieParser());

const jsonBodyParser = express.json();
server.use(jsonBodyParser);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/', pageRouter);


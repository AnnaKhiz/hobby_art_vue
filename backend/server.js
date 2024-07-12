require('dotenv').config();
const { port } = require('config');
const { router: pageRouter } = require('./routes/pages.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')
const history = require('connect-history-api-fallback');
const { staticFileMiddleware } = require('./middleware/routes')

const express = require('express');
const server = express();
server.use(cookieParser());

server.listen(port, (req, resp) => {
  server.get('/', (req, res) => {

    res.send('hello world')
  })
  console.log(`Server started on port ${port}`)
});

server.use(cors());



const jsonBodyParser = express.json();
server.use(jsonBodyParser);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(staticFileMiddleware);

server.use('/', pageRouter);

server.use(history());
server.use(staticFileMiddleware);


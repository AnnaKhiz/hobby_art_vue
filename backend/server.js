require('dotenv').config();
const { port } = require('config');
const { router: pageRouter } = require('./routes/pages.js');
const { router: itemsRouter } = require('./routes/items.js')
const { router: ordersRouter } = require('./routes/orders.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')
// const history = require('connect-history-api-fallback');
// const { staticFileMiddleware } = require('./middleware/routes')

const express = require('express');
const server = express();
const allowedOrigins = ['http://localhost:8080', 'https://hobby-art-vue.vercel.app'];

server.use(cors(
  {
    origin: function(origin, callback) {
			if (allowedOrigins.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
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

// server.use(staticFileMiddleware);

server.use('/', pageRouter);
server.use('/api/items', itemsRouter)
server.use('/api/orders', ordersRouter)


// server.use(history());
// server.use(staticFileMiddleware);


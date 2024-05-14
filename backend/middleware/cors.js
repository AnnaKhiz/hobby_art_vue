const express = require('express');
const server = express();
server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:5000"); // Здесь указывается разрешенный источник
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
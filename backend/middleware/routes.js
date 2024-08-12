const express = require('express');
const path = require("path");

const staticFileMiddleware = express.static(path.join(__dirname, '../../frontend/dist'));

module.exports = { staticFileMiddleware }

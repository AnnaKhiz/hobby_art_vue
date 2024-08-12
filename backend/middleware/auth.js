const { jwtKey } = require('config');
const { verifyJwt } = require('../utils/authEncoding');

function parserJwt(req, res, next) {
  console.log('req.cookies', req.cookies)
  const { token } = req.cookies;
  if (token) {
    const payload = verifyJwt(token, jwtKey);
    console.log('payload ', payload)
    req._auth = payload;
  } else {
    req._auth = {};
  }
  next();
}

module.exports = { parserJwt };

const { jwtKey } = require('config');
const { verifyJwt } = require('../utils/authEncoding');

function parserJwt(req, res, next) {
  console.log(req)
  const { id } = req.params;
  console.log(`token from auth ${id}`)
  if (id) {
    const payload = verifyJwt(id, jwtKey);
    req._auth = payload || {};
  } else {
    req._auth = {};
  }
  next();
}

module.exports = { parserJwt };
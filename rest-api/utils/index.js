const jwt = require('./jwt');
const auth = require('./auth');
const { notFound, errorHandler } = require('./errHandler');

module.exports = {
  jwt,
  auth,
  notFound,
  errorHandler
}

global.__basedir = __dirname;
require('dotenv').config();
const cors = require('cors');
const dbConnector = require('./config/db');
const router = require('./router');
const { errorHandler, notFound } = require('./utils');

dbConnector()
  .then(() => {
    const app = require('express')();
    require('./config/express')(app);
    app.use(cors({ exposedHeaders: 'Authorization' }));
    app.use('/api', router);
    app.use(notFound);
    app.use(errorHandler);
    const { port } = require('./config/config');
    app.listen(port, console.log(`Listening on port ${port}!`));
  })
  .catch(console.error);
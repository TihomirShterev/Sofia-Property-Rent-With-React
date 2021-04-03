global.__basedir = __dirname;
require('dotenv').config();
const dbConnector = require('./config/db');
const apiRouter = require('./router');
const cors = require('cors');
const { errorHandler } = require('./utils');
const path = require('path');
const express = require('express');

dbConnector()
  .then(() => {
    const config = require('./config/config');

    const app = require('express')();
    require('./config/express')(app);

    app.use(cors(config.cors));

    app.use('/api', apiRouter);

    app.use(express.static(path.join(__dirname, "./build")));
    app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./build/index.html")));

    app.use(errorHandler);

    app.listen(config.port, console.log(`Listening on port ${config.port}!`));
  })
  .catch(console.error);
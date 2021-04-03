const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 3001,
    // dbURL: 'mongodb://localhost:27017/ItemsDB-React',
    dbURL: 'mongodb+srv://random:random@cluster0.gz36o.mongodb.net/ItemsDB-React',
    origin: ['http://localhost:3000', 'http://localhost:4200', 'https://estatesbg.herokuapp.com/'],
    cors: {
      exposedHeaders: 'Authorization',
      origin: ['http://localhost:3000', 'http://localhost:4200', 'https://estatesbg.herokuapp.com/'],
      credentials: true
    }
  },
  production: {
    port: process.env.PORT || 3001,
    dbURL: process.env.DB_URL_CREDENTIALS,
    origin: ['https://estatesbg.herokuapp.com/']
  }
};

module.exports = config[env];

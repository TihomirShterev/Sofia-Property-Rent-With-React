const {
  userModel,
  tokenBlacklistModel
} = require('../models');

const utils = require('../utils');
const { authCookieName } = require('../app-config');

const bsonToJson = (data) => { return JSON.parse(JSON.stringify(data)) };
const removePassword = (data) => {
  const { password, __v, ...userData } = data;
  return userData
}

function register(req, res, next) {
  const { email, password, repeatPassword } = req.body;
  let myItems = 0;

  return userModel.create({ email, password, myItems })
    .then((createdUser) => {
      createdUser = bsonToJson(createdUser);
      createdUser = removePassword(createdUser);
      // console.log(createdUser);

      const token = utils.jwt.createToken({ id: createdUser._id });
      if (process.env.NODE_ENV === 'production') {
        res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
      } else {
        res.cookie(authCookieName, token, { httpOnly: true })
      }
      res.status(200)
        .send(createdUser);
    })
    .catch(err => {
      if (err.name === 'MongoError' && err.code === 11000) {
        let field = err.message.split("index: ")[1];
        field = field.split(" dup key")[0];
        field = field.substring(0, field.lastIndexOf("_"));

        res.status(409)
          .send({ message: `This ${field} is already registered!` });
        return;
      }
      next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  userModel.findOne({ email })
    .then(user => {
      return Promise.all([user, user ? user.matchPassword(password) : false]);
    })
    .then(([user, match]) => {
      if (!match) {
        res.status(401)
          .send({ message: 'Wrong email or password' });
        return
      }
      user = bsonToJson(user);
      user = removePassword(user);

      const token = utils.jwt.createToken({ id: user._id });

      if (process.env.NODE_ENV === 'production') {
        res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'none', secure: true })
      } else {
        res.cookie(authCookieName, token, { httpOnly: true })
      }
      res.status(200)
        .send(user);
    })
    .catch(next);
}

function logout(req, res) {
  const token = req.cookies[authCookieName];

  tokenBlacklistModel.create({ token })
    .then(() => {
      res.clearCookie(authCookieName)
        .status(200)
        .send({ message: 'Logged out!' });
    })
    .catch(err => res.send(err));
}

function getProfile(req, res, next) {
  // console.log(req.query._id);
  userModel.findById(req.query._id)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send("Error"));

  // const { _id: userId } = req.user;

  // userModel.findOne({ _id: userId }, { password: 0, __v: 0 }) //finding by Id and returning without password and __v
  //   .populate("items")
  //   // .populate("myItems")
  //   .then(user => {
  //     console.log(user);
  //     res.status(200).json(user);
  //   })
  //   .catch(next);
}

module.exports = {
  login,
  register,
  logout,
  getProfile,
};

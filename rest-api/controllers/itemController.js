const { itemModel, userModel } = require("../models");

function getItems(req, res, next) {
  // console.log(req.user);
  itemModel
    .find()
    .populate("userId")
    .then(items => res.json(items))
    .catch(next);
}

function getDetails(req, res, next) {
  // console.log(req.query._id);
  const itemId = req.query._id;

  itemModel
    .findById(itemId)
    .populate("userId")
    .then(item => {
      // console.log(item);
      res.json(item);
    })
    .catch(next);
}

function createItem(req, res, next) {
  const { title, imageURL, description } = req.body;
  // console.log(req.user);
  const { _id: userId } = req.user;

  Promise.all([
    itemModel.create({ title, imageURL, description, peopleWhoIncremented: [userId], userId }),
    userModel.updateOne({ _id: userId }, { $inc: { myItems: 1 } })
  ])
    .then(item => {
      // console.log(item);
      res.status(200).json(item);
    })
    .catch(next);
}

function increment(req, res, next) {
  const itemId = req.params.itemId;
  const { _id: userId } = req.user;
  itemModel
    .findByIdAndUpdate({ _id: itemId }, { $addToSet: { peopleWhoIncremented: userId } }, { new: true })
    .then(updatedItem => {
      res.status(200).json(updatedItem);
    })
    .catch(next);
}

module.exports = {
  getItems,
  createItem,
  getDetails,
  increment
};

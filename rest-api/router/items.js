const express = require("express");
const router = express.Router();
const { auth } = require("../utils");
const { itemController } = require("../controllers");

router.get("/", itemController.getItems);

router.post("/", auth(), itemController.createItem);

router.get("/:itemId", itemController.getDetails);

router.put("/:itemId", auth(), itemController.increment);

module.exports = router;

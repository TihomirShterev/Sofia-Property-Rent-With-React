const express = require("express");
const router = express.Router();
const { auth } = require("../utils");
const { itemController } = require("../controllers");

router.get("/", itemController.getItems);
// router.get("/", auth(), itemController.getItems);

router.post("/", auth(), itemController.createItem);

router.get("/:itemId", itemController.getDetails);
// router.get("/:itemId", auth(), itemController.getDetails);

router.put("/:itemId", auth(), itemController.increment);

module.exports = router;

const router = require("express").Router();
const users = require("./users");
const items = require("./items");

router.use("/users", users);
router.use("/items", items);

module.exports = router;

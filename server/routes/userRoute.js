const express = require("express");
const { getContacts } = require("../controllers/userController");
const router = express.Router();

router.route("/users").get(getContacts);

module.exports = router;

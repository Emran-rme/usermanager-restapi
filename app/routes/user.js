const express = require("express");

const usersController = require("../controllers/usersController");

const router = express.Router();

router.get("/", usersController.index);
router.post("/", usersController.store);

module.exports = router;

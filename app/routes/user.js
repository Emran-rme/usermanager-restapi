const express = require("express");

const usersController = require("../controllers/usersController");

const router = express.Router();

router.get("/", usersController.index);
router.post("/", usersController.store);
router.get("/:id", usersController.show);
router.delete("/:id", usersController.destroy);

module.exports = router;

const express = require("express");

const {
  getMessages,
  postMessage,
} = require("../controllers/messageController");

const router = express.Router();

router.get("/messages", getMessages);

router.post("/messages", postMessage);

module.exports = router;

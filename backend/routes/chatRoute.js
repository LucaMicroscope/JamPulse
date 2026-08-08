const express = require("express");
const router = express.Router();

const ChatController = require("../controllers/chatController");

router.get('/', ChatController.getChats)
router.post('/', ChatController.createChat)

module.exports = router;
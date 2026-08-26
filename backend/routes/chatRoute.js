const express = require("express");
const router = express.Router();

const ChatController = require("../controllers/chatController");

router.get('/', ChatController.getChats)
router.post('/', ChatController.createChat)

// Rotta per eliminare una chat tramite il suo ID
router.delete('/:id', ChatController.deleteChat)

module.exports = router;
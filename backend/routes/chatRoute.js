const express = require("express");
const router = express.Router();

const ChatController = require("../controllers/chatController");

router.post("/", ChatController.createChat);
router.get("/:id", ChatController.getChat);
router.put("/:id", ChatController.updateChat);
router.delete("/:id", ChatController.deleteChat);

moudule.exports = router;
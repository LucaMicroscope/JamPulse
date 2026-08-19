const express = require("express");
const router = express.Router({ mergeParams: true }); //mergeParams serve per leggere anche :id relativo alla chat. Perché /:id si trova in index.js


const messageController = require("../controllers/messageController");

router.get('/', messageController.getMessages)
router.post('/',messageController.createMessage)
router.put('/:messageId',messageController.updateMessage)
router.delete('/:messageId',messageController.deleteMessage)

module.exports = router;

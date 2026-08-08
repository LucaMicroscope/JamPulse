const express = require("express");
const router = express.Router({ mergeParams: true }); //mergeParams serve per leggere anche :id relativo alla chat. Perché /:id si trova in index.js


const messageController = require("../controllers/messageController");

router.get('/', messageController.getMessages)

module.exports = router;

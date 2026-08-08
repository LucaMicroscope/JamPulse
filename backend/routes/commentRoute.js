const express = require("express");
const router = express.Router({ mergeParams: true }); //mergeParams serve per leggere anche :id relativo al post. Perché /:id si trova in index.js

const CommentController = require("../controllers/commentController");

router.get('/', CommentController.getComments)
router.post('/', CommentController.createComment)
router.put('/:commentId', CommentController.updateComment)
router.delete('/:commentId', CommentController.deleteComment)

module.exports = router;

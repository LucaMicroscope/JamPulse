const express = require("express");
const router = express.Router();

const PostController = require("../controllers/postController");

router.get('/', PostController.getPosts)
router.get('/:id', PostController.getPostById)
router.put('/:id', PostController.updatePost)
router.post('/', PostController.createPost)
router.delete('/:id', PostController.deletePost)
router.post('/:id/like', PostController.toggleLike)

module.exports = router;
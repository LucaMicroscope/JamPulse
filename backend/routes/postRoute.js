const express = require("express");
const router = express.Router();

const PostController = require("../controllers/postController");

router.post("/", PostController.createPost);
router.get("/:id", PostController.getPost);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

module.exports = router;
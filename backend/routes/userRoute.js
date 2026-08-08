const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

router.get('/me', UserController.getLoggedUser)
router.put('/me', UserController.updateProfile)
router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUserById)
router.get('/:id/posts', UserController.getPosts)
router.post('/:id/follow', UserController.follow)
router.delete('/:id/follow', UserController.unfollow)

module.exports = router;
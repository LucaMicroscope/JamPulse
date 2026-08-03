const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/postController");

router.post("/", AuthController.createAuth);
router.get("/:id", AuthController.getAuth);
router.put("/:id", AuthController.updateAuth);
router.delete("/:id", AuthController.deleteAuth);

module.exports = router;

const express = require("express");
const router = express.Router();

const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/verify", userVerification);

module.exports = router;

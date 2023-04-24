const express = require("express");
const router = express.Router();
const {
  register,
  login,
  about,
  products,
  logout,
  home,
} = require("../controllers/controller");
const cookieParser = require("cookie-parser");
const auth = require("../middleware/auth");

// const auth = require("../middleware/auth");
router.use(cookieParser());

router.post("/register", register);
router.post("/login", login);
router.get("/about", auth, about);
router.get("/products", auth, products);
router.get("/logout", logout);
router.get("/home", auth, home);

module.exports = router;

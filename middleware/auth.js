const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const RegisterModel = require("../models/userSchema");
const cookieParser = require("cookie-parser");
const secKey = "Abhijeet";

app.use(cookieParser());

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;
    console.log(token);
    const verifyToken = jwt.verify(token, secKey);

    console.log(verifyToken);
    const rootUser = await RegisterModel.findOne({ _id: verifyToken.id });

    if (!rootUser) {
      res.status(400).json({ Error: "User Not Found" });
    }

    req.token = token;
    req.rootUser = rootUser;

    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ Error: "Unauthorized" });
  }
};
module.exports = auth;

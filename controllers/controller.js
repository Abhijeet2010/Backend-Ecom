const RegisterModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const secKey = "Abhijeet";

const register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "plz fill all the fields properly" });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const userExist = await RegisterModel.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ error: "User alredy Exists" });
    }

    const user = new RegisterModel({ username, email, password: hashPassword });
    await user.save();
    res.status(200).json({ message: "user Register Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something Went Wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ Error: "Please fill the data" });
    }
    const validateEmail = await RegisterModel.findOne({ email: email });

    if (validateEmail) {
      const passCompare = await bcrypt.compare(
        password,
        validateEmail.password
      );

      if (!passCompare) {
        res.status(400).json({ Error: "Credentials Not match! Pass" });
      } else {
        const token = await jwt.sign({ id: validateEmail._id }, secKey);

        res.cookie("jwtToken", token, {
          expires: new Date(Date.now() + 500000),
          secure: true,
          httpOnly: true,
        });

        res.status(200).json({
          message: "user Login suceesfully",
        });
      }
    } else {
      res.status(400).json({ Error: "wrong Details Email" });
    }
  } catch (err) {
    res.status(400).json({ Error: "wrong details" });
  }
};

const about = (req, res) => {
  try {
    res.send(req.rootUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const products = (req, res) => {
  try {
    res.send(req.rootUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  console.log("hi I am Logout");
  res.clearCookie("jwtToken", { path: "/" });
  res.status(200).json({ message: "User succesfully Logout" });
};

const home = (req, res) => {
  try {
    res.send(req.rootUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login, about, products, logout, home };

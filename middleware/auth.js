const jwt = require("jsonwebtoken");
const RegisterModel = require("../models/userSchema");
const secKey = "Abhijeet";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;

    const verifyToken = jwt.verify(token, secKey);

    console.log(verifyToken);
    const rootUser = await RegisterModel.findOne({ id: verifyToken._id });

    if (!rootUser) {
      res.status(400).json({ Error: "User Not Found" });
    }
    req.token = token;
    req.rootUser = rootUser;
    res.status(200).send(token);
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ Error: "Unauthorized" });
  }
};
module.exports = auth;

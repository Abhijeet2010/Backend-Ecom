const mongoose = require("mongoose");

const url =
  "mongodb+srv://Abhijeet2010:Abhijeet123@database-1.uv48jyg.mongodb.net/user?retryWrites=true&w=majority";
const connection = async () => {
  try {
    await mongoose.connect(url);
    console.log("mongoose connect succesfully");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connection;

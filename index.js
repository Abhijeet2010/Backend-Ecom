const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
const cors = require("cors");
const router = require("./routes/route");
const connection = require("./db/mongoose");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://backend-ecom-uc6y.onrender.com"],
  })
);
app.use(router);

app.get("/", (req, res) => {
  res.send({ message: "Hello Homepagee" });
});

const start = async () => {
  try {
    app.listen(2000, () => {
      console.log("server started at 2000");
    });
    await connection();
  } catch (error) {
    console.log(error.message);
  }
};
start();

require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");

//PORT Number
const port = process.env.PORT || 4000;

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser());

//Router
app.use("/api", authRoutes);

//Starting server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

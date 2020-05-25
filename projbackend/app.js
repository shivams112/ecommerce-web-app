require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.get("/", (req, res) => res.send("HomePage"));

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

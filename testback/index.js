const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => res.send("Home Page"));
app.get("/login", (req, res) => res.send("You are visiting login route"));
app.get("/signup", (req, res) => res.send("You are signed up"));

const admin = (req, res) => {
  res.send("Admin Page");
};

const isLoggedIn = true;
const isAdmin = (req, res, next) => {
  if (isLoggedIn) {
    next();
  } else res.send("Please log in first");
};

app.get("/admin", isAdmin, admin);

app.listen(port, () => console.log("Server is running..."));

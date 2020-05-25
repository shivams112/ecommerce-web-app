const express = require("express");

const app = express();

const port = 3000;

app.get('/', (req,res)=>res.send("Home Page"));
app.get('/login', (req,res)=>res.send("You are visiting login route"));
app.get('/signup', (req,res)=>res.send("You are signed up"));

app.listen(port, ()=>console.log("Server is running..."));
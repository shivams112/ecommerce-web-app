require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

//My Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

//PORT Number
const port = process.env.PORT || 4000;

//DB Connection
mongoose
  .connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/store', {
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
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

//chacking for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("projfrontend/build/"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "projfrontend", "build", "index.html")
    );
  });
}

//Starting server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");
const path = require("path");
const fileupload = require("express-fileupload");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", router);
app.use(errorMiddleware);
app.use(express.static("images"));
app.use(express.static("pdfs"));
app.use(express.static("audios"));

const start = async () => {
  console.log("database connecting on " + process.env.DB_URL);
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    app.listen(PORT, () => console.log("Server started on PORT = " + PORT));
  } catch (e) {
    console.log(e);
  }
};

if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production
  app.use(express.static('../client/build'));
  app.use("/api", router);
  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '../client', 'build','index.html')));
} else {
  app.use("/api", router);
}

start();

module.exports = app;

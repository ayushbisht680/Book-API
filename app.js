require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

// importing
const { findOneAndUpdate, findOneAndDelete } = require("./schema/book");

// API

const Book = require("./API/book");
const Author = require("./API/author");
const Publication = require("./API/publication");

mongoose
  .connect(process.env.MONODB_URL, {
    // Predefined Asynchronously
    useNewUrlParser: true,
    useUnifiedTopology: true, // copy then from mongoose documentation
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connect To The Database Successfully"))
  .catch(() => console.log("Cannot Connect To The Database"));

const app = express();

// All data in JSOn format

app.use(express.json());

// Microservices
app.use("/book", Book);
app.use("/author", Author);
app.use("/publication", Publication);

app.get("/", (req, res) => {
  res.json({ message: "Server Connected" });
});

// Listening to the port
app.listen(80, () => {
  console.log("Server is running");
});

"use strict";
require("dotenv").config();
const express = require("express");
const myDB = require("./connection");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const pug = require("pug");
const app = express();
const cors = require("cors");
app.use(cors());

fccTesting(app); //For FCC testing purposes
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route("/").get((req, res) => {
  res.render("index", { title: "Connected to Database", message: "Please log in" });
});

app.set("view engine", "pug");
app.set("views", "./views/pug");

let session = require("express-session");
let passport = require("passport");
let ObjectId = require('mongodb');
let mongo = require('mongodb').MongoClient

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
    done(null, null);
  });
});
let uri =
  "mongodb+srv://xxxxxx:" +
  process.env.PW +
  "@xxxxxxxx.xxxxxxx.mongodb.net/xxxxxxxx?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

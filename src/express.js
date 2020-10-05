const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect(
  "mongodb://localhost:27017/Visitors",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (!error) {
      console.log("MongoDB connection success");
    } else {
        console.log("Error in DB connection: " + error);
    }
  }
);
const addNewVisitorSchema = require("./model/visitorModel");
function addNewVisitor(
  visitorName,
  assistantName,
  visitorAge,
  dateOfVisit,
  timeOfVisit,
  comments
) {
  const visitorData = new addNewVisitorSchema({
    visitorName: visitorName,
    assistantName: assistantName,
    visitorAge: visitorAge,
    dateOfVisit: dateOfVisit,
    timeOfVisit: timeOfVisit,
    comments: comments,
  });
  visitorData.save((error) => {
    if (error) {
      return error;
    }
  });
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/new_visit", (req, res) => {
  res.render("visitorForm", {
    title: "New Visitor",
  });
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.post("/new_visit", (req, res) => {
  addNewVisitor(
    req.body.visitorName,
    req.body.assistantName,
    req.body.visitorAge,
    req.body.dateOfVisit,
    req.body.timeOfVisit,
    req.body.comments
  );
  res.redirect("/thankYou");
});

app.get("/thankYou", (req, res) => {
  addNewVisitorSchema
    .find((err, docs) => {
      if (!err) {
        res.render("thank_you", {
          data: docs,
        });
      } else {
        res.send("error");
      }
    })
    .sort({ _id: -1 })
    .limit(1);
});

app.listen(4000, () => {
  console.log("Server started");
});
module.exports = { mongoose, addNewVisitorSchema };

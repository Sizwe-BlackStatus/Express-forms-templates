const mongoose = require("mongoose");
const { addNewVisitor } = require("../src/express");

const visitorData = {
  visitorName: "Jason",
  assistantName: "Corleone",
  visitorAge: 34,
  dateOfVisit: "2020-05-20",
  timeOfVisit: "10:00",
  comments: "Thats Wowza!",
};
describe("addNewVisitorModel", () => {
  beforeEach((done) => {
    mongoose.connect(
      "mongodb://localhost:27017/Visitors",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done()
    );
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });
  it("should have visitors data saved", async () => {
    const newVisitor = new addNewVisitor(visitorData);
    const newVisitorSaved = await newVisitor.save();
    expect(newVisitorSaved._id).toBeDefined();
    expect(newVisitorSaved.visitorName).toBe(newVisitor.visitorName);
    expect(newVisitorSaved.assistantName).toBe(newVisitor.assistantName);
    expect(newVisitorSaved.visitorAge).toBe(newVisitor.visitorAge);
    expect(newVisitorSaved.dateOfVisit).toBe(newVisitor.dateOfVisit);
    expect(newVisitorSaved.timeOfVisit).toBe(newVisitor.timeOfVisit);
    expect(newVisitorSaved.comments).toBe(newVisitor.comments);
  });
});

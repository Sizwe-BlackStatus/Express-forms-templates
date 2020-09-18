const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")

const app = express()
const addNewVisitor = require('./model/visitorModel');

mongoose.connect('mongodb://localhost:27017/Visitors', {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
    if (!error) {
        console.log('MongoDB connection success')}
    else (console.log('Error in DB connection: ' + error))
});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/new_visit', (req,res) => {
    res.render('visitorForm', {
        title: 'New Visitor'
    })
})
app.use(bodyParser.urlencoded({
    extended: true
}))
app.post('/new_visit', (req,res)=>{
    var addVisitor = new addNewVisitor()
    addVisitor.visitorName = req.body.visitorName
    addVisitor.assistantName = req.body.assistantName
    addVisitor.visitorAge = req.body.visitorAge
    addVisitor.dateOfVisit = req.body.dateOfVisit
    addVisitor.timeOfVisit = req.body.timeOfVisit
    addVisitor.comments = req.body.comments

    addVisitor.save((err,doc) => {
        if(!err){
            res.redirect('/thankYou')
        }
        else{
            console.log(err)
        }
    })

})

app.get('/thankYou', (req, res) => {
    addNewVisitor.find((err,docs) => {
        if(!err) {
            res.render("thank_you", { 
                data : docs
            })
        }
        else {
            res.send("error")
        }
    }).sort({_id: -1}).limit(1)
})

app.listen(4000, () => {
    console.log('Server started')
})
module.exports = {mongoose, addNewVisitor}
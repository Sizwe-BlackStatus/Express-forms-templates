const mongoose = require('mongoose')

let visitorSchema = mongoose.Schema({
    
    visitorName: {
        type: String
    },
    assistantName: {
        type: String
    },
    visitorAge: {
        type: Number
    },
    dateOfVisit: {
        type: Date
    },
    timeOfVisit: {
        type: String
    },
    comments: {
        type: String
    },
})
const addNewVisitorSchema = module.exports = mongoose.model('addNewVisitorSchema', visitorSchema)
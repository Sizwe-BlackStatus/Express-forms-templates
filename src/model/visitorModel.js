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
const addNewVisitor = module.exports = mongoose.model('addNewVisitor', visitorSchema)
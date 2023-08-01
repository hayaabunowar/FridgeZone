const mongoose = require('mongoose')
const Schema = mongoose.Schema //make new schema

const healthReportSchema = new Schema({
    reporter:{
        type:String,
        required:true
    },
    dateOfReport:{
        type:String,
        required:true
    },
    itemsExpired:{
        type: Object,
        required:true
    },
    quantityExpired:{
        type: Number,
        required:true
    },
    storecode:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports = mongoose.model('HealthReport',healthReportSchema)

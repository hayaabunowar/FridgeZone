const mongoose = require('mongoose')

const Schema = mongoose.Schema //make new schema

const stockItemSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    expiryDate:{
        type: String,
        required:true
    },
    supplier:{
        type: String,
        required:true
    },
    storecode:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('StockItem',stockItemSchema)

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const d = new Date()
const month = parseInt(d.getMonth())
const currmonth = month + 1
const full_date = d.getDate() + '-' + currmonth + "-" + d.getFullYear()

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    url: {
        type: String,
        required: true
    }, 
    date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model(`Article: ${full_date}`, articleSchema)
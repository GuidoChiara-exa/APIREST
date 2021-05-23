'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const viewidnicknameSchema = Schema({
    viewid : String,
    id : String
})

module.exports = mongoose.model('viewidnickname', viewidnicknameSchema)
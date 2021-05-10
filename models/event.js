'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = Schema({
    event_id : String,
    time : String,
    value : [{}]
})

module.exports = mongoose.model('Event', eventSchema)
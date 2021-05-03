'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const procesoSchema = Schema({
    name: String,
    tiempoCeremonia: Number
})

module.exports = mongoose.model('Proceso', procesoSchema)
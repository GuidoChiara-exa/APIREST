'use strict'
const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const teammemberSchema = Schema({

    
    name:{ type: String,
            unique: true,
            required: true
    },

    password:{
        type: String,
        required: true
    },

    role:{
        type: String,
        required: false
    }

})

module.exports = mongoose.model('Teammember', teammemberSchema)
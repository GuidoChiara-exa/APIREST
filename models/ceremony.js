'use strict'
const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const ceremonySchema = Schema( {

    project:{
        type: String
    },

    date:{
        type: String
    },
    
    type:{
        type: String
    },

    duration:{
        type: String
    },
    
    participants:{
        type: [{
            id_teammember : String
             }]
    },

    reminder:{
        type: String,
        require = false
    },
    
    chat_text:{
        type: String,
        require = false
    }
})

module.exports = mongoose.model('Ceremony', ceremonySchema)
'use strict'
const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const taskSchema = Schema( {
   
    proyect:{
        type = String
    },

    name:{
        type: String
    },
    
    nickname:{
        type: String
    },
    
    date:{
        type: date,
    },
    
    description:{
        type: String
    },
    
    associated_message:{
        type: String
    },
    
    subtasks:{
        type: [{
            id_task : String
        }],
        required = false
    },
    
    expiration_date:{
        type: date
    },
    
    color:{
        type: String
    },
    
    priority:{
        type: String
    },
    
    state:{
        type: String
    },

    teammember:{
        type: String
    },
    
    id_previous:{
        type: String,
        required: false
    },

    actual:{
        type: Boolean
    }
})

module.exports = mongoose.model('Task', taskSchema)
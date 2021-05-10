'use strict'

const Ceremony = require('../models/ceremony')
const { json } = require('body-parser')

async function postCeremony(req, res){
   
    let ceremony = new Ceremony()

    ceremony.project = req.body.project
    ceremony.date = req.body.date 
    ceremony.duration = req.body.duration
    ceremony.participants = req.body.participants
    ceremony.reminder = req.body.reminder 
    ceremony.chat_text = req.body.chat_text
   
    ceremony.save((err, ceremonySaved) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        res.status(200).json({ceremonySaved})
    })
}

async function getCeremony(req, res){
    const ceremonies = await Ceremony.find({})
    res.status(200).json({ceremonies})
}

async function putCeremony(req, res){

    let ceremony_id = req.params.ceremony_id
    let update = req.body

    Task.findByIdAndUpdate(taskId, update, (err,ceremonyUpdated) => {
        if(err) res.status(500).send({message: `Error al actualizar en la base de datos: ${err}`})
        res.status(200).json({update})
    })

    
    

}
module.exports = {
    postCeremony,
    getCeremony,
    putCeremony
}
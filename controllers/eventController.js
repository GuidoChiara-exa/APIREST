'use strict'

const Event = require('../models/event')
const { json } = require('body-parser')

async function postEvent(req, res){
    let body = req.body
    const event_id = body.event_id
    const time = body.time
    delete body.event_id
    delete body.time
    let ArrJson = []
    for(const property in body){
        ArrJson.push({
            name : property,
            value : body[property]
        })
    }

    let eventSave = new Event()
    eventSave.value = ArrJson
    eventSave.event_id = event_id
    eventSave.time = time
    eventSave.save((err, eventStore)=>{
        if (err) res.status(500).send({message:`Error al salvar en la base de datos: ${err}`})
        //ejecutar algo segun el tipo
        /*
        switch(event_id){
            //no se la diferencia entre UserStory y tarea
            case "CreoTarea" : 
                break;
            case "CreoUserStory":
                break;
            case "CambioEstadoUserStory":
                break;
            case "CambioEstadoTarea" :
                break;
            case "CreoCeremonia" : 
                break;
        }
        */
        //fin ejecución
        res.status(200).json({eventStore})
    })
}
async function getEvent(req, res){
    const ArrJson = await Event.find({"event_id" : req.params.event_id}).sort({time : 1})
    let ArrJson_aux = []
      ArrJson.forEach(pos => {
        let json_aux = {event_id : pos.event_id, time : pos.time}
        pos.value.forEach( element => {
            json_aux[element.name] = element.value
        })
        ArrJson_aux.push(json_aux)
      })
      res.status(200).json(ArrJson_aux)
}

module.exports = {
    getEvent,
    postEvent
}
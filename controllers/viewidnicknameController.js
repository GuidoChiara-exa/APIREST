'use strict'

const Viewidnickname = require('../models/viewidnickname')
const { json } = require('body-parser')

async function postview(req, res){
    console.log('post')
    console.log(req.body)
    let viewid_nickname = new Viewidnickname()
    viewid_nickname.id = req.body.id
    viewid_nickname.viewid = req.body.viewid
    viewid_nickname.save((err, viewid_nicknameSaved) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        res.status(200).json({viewid_nicknameSaved})
    })
}
async function getview(req, res){
    const ArrJson = await Viewidnickname.find({"id" : req.params.id}).sort({time : 1})
    //let ArrJson_aux = []
    res.status(200).json(ArrJson)
}

async function  getviewtoda  (req, res){
    const vies = await Viewidnickname.find({})
    res.status(200).json({vies})
}

module.exports = {
    getview,
    postview,
    getviewtoda
}
'use strict'

const Teammember = require ('../models/teammember')
const { json } = require('body-parser')
const Hash = require ("crypto")

async function getTeammember(req, res){
    let name = req.params.name
    const teammember = await Teammember.findOne({"name" : name})
    res.status(200).json({teammember})
}

async function  getTeammembers  (req, res){
    const teammember = await Teammember.find({})
    res.status(200).json({teammember})
}

async function postTeammember(req, res){
    console.log('POST /api/teammember')
    console.log(req.body)

    let teammember = new Teammember()
    teammember.name = req.body.name
    teammember.password = Hash.createHmac('sha256',req.body.password).update(req.body.password).digest().toString();
    teammember.role = req.body.role
    

    teammember.save((err, teamSaved) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        res.status(200).json({teamSaved})
    })
}



module.exports = {
    getTeammember,
    getTeammembers,
    postTeammember
}
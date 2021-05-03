'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Proceso = require('./models/proceso')

const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.get('/api/proceso', (req, res)=> {
    res.send(200, {product: []})
})

app.get('/api/proceso/:id', (req, res)=> {
    res.send({message:'hola mundo'})
})

app.post('/api/proceso',(req, res)=>{
    let proceso = new Proceso()
    proceso.name = req.body.name
    proceso.tiempoCeremonia = req.body.tiempoCeremonia
    proceso.save((err, procesoStore)=>{
        if (err) res.status(500).send({message:'Error al guardar'})
        res.status(200).send({proceso: procesoStore})
    })
})

app.put('/api/proceso/:id', (req, res)=> {
    res.send({message:'hola mundo'})
})

mongoose.connect('mongodb+srv://Guichi:hola1234@cluster0.clby5.gcp.mongodb.net/apiBD?retryWrites=true&w=majority',(err, res)=>{
    if(err) throw err
    console.log('conexion con la base establecida')
    app.listen(port, () => {
        console.log(`API REST CORRIENDO EN http://localhost:${port}`)
    })
})


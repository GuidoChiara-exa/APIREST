'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Proceso = require('./models/proceso')

const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//aqui
const Task = require('./models/taskModel')
//aqui
app.post('/api/taskModel', (req, res) => {
    console.log('POST /api/taskModel')
    console.log(req.body)

    let task = new Task()

    task.proyect = req.body.proyect
    task.name = req.body.name
    task.nickname = req.body.nickname
    task.date = req.body.date //mmm mejor que la pasen ellos, porque el año pasado creaba horas random
    task.description = req.body.description
    task.associates_message = req.body.associates_message
    task.subtasks = req.body.subtaks //lo deberian pasar ellos? //necesitan saber los ids
    task.expiration_date = req.body.expiration_date
    task.color = req.body.color
    task.priority = req.body.priority
    task.state = req.body.state
    task.teammember = req.body.teammember
    task.id_previous = null //porque esta creando una
    task.actual = true //porque esta creando una

    task.save((err, taskSaved) => {
        if(err) res.status(500).send({message: 'Error al salvar en la base de datos: ${err}'})
        res.status(200).send({taskStored})
    })
})

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


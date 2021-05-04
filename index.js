'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Proceso = require('./models/proceso')
const Task = require('./models/task')
const { json } = require('body-parser')

const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())




//metodo post mediante el cual se publica un documento de task en la BDD
app.post('/api/task', async(req, res) => {
    console.log('POST /api/task')
    console.log(req.body)

    let task = new Task()

    task.project = req.body.project
    task.name = req.body.name
    task.nickname = req.body.nickname
    task.date = req.body.date //mmm mejor que la pasen ellos, porque el año pasado creaba horas random
    task.description = req.body.description
    task.associated_message = req.body.associates_message
    task.subtasks = req.body.subtasks //lo deberian pasar ellos? //necesitan saber los ids
    task.expiration_date = req.body.expiration_date
    task.color = req.body.color
    task.priority = req.body.priority
    task.state = req.body.state
    task.teammember = req.body.teammember
    task.id_previous = null //porque esta creando una
    task.actual = true //porque esta creando una

    task.save((err, taskSaved) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        res.status(200).json({taskSaved})
    })
})

//metodo get, que devulve las tareas actuales del proyecto "project"
//el parametro "project" no puede tener espacios
app.get('/api/task/:project', async(req, res) => {
    let projectId = req.params.project

    const tasks = await Task.find({"actual" : "true", "project" : projectId})
    res.status(200).json({tasks})
})

app.get('/api/task', async(req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

app.put('/api/task/:task_id', async(req, res) => {
    let taskId = req.params.task_id
    let update = req.body

    //obtengo el documento
    const taskUpdate = await Task.findById(taskId)
   
    let newTask = new Task()

    newTask.project = taskUpdate.project
    newTask.name = taskUpdate.name
    newTask.nickname = taskUpdate.nickname
    newTask.date = taskUpdate.date 
    newTask.description = taskUpdate.description
    newTask.associated_message = taskUpdate.associates_message
    newTask.subtasks = taskUpdate.subtasks 
    newTask.expiration_date = taskUpdate.expiration_date
    newTask.color = taskUpdate.color
    newTask.priority = taskUpdate.priority
    newTask.state = taskUpdate.state
    newTask.teammember = taskUpdate.teammember
    newTask.id_previous = taskUpdate.id_previous 
    newTask.actual = false //porque es un estado anterior

    newTask.save((err, taskSaved) => {
        if(err) res.status(500).send({message: `Error al actualizar en la base de datos: ${err}`})
        //res.status(200).json({taskSaved})
        update.id_previous = taskSaved._id  
    })
    
    taskUpdate.findByIdAndUpdate(taskId, update, (err,taskUpdated) => {
        if(err) res.status(500).send({message: `Error al actualizar en la base de datos: ${err}`})
        res.status(200).json({taskUpdated})
    })
    

})

app.get('/api/proceso', async(req, res) => {
    const Procesos = await Proceso.find({})
    res.status(200).json({Procesos})
})

app.get('/api/proceso/:id', (req, res)=> {
    const Procesos = Proceso.findById(req.params.id)
    res.status(200).json({Procesos})
})

app.post('/api/proceso',(req, res)=>{
    let proceso = new Proceso()
    proceso.name = req.body.name
    proceso.tiempoCeremonia = req.body.tiempoCeremonia
    proceso.save((err, procesoStore)=>{
        if (err) res.status(500).send({message:'Error al guardar'})
        res.status(200).json({procesoStore})
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


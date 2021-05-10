'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Proceso = require('./models/proceso')
const Task = require('./models/task')
const Event = require('./models/event')
const Ceremony = require('./models/ceremony')
const { json } = require('body-parser')
const { events } = require('./models/proceso')

const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())



//.....Tareas.....

//metodo post mediante el cual se publica un documento de task en la BDD
app.post('/api/task', taskCtrl.postTask)

//metodo get, que devulve las tareas actuales del proyecto "project"
//el parametro "project" no puede tener espacios
app.get('/api/task/:project', taskCtrl.getTaskActual)

app.get('/api/task', task.Ctrl.getTask)

app.delete('/api/task/:task_id', taskCtrl.deleteTask)

app.put('/api/task/:task_id', taskCtrl.putTask)


//.....Procesos.....

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


//.....Ceremonias.....

app.post('/api/ceremony', ceremonyCtrl.postCeremony)

app.get('/api/ceremony', ceremonyCtrl.getCeremony)

app.put('/api/task/:ceremony_id', ceremonyCtrl.putCeremony)


//....Eventos.....

app.post('/api/event', eventCtrl.postEvent)

app.get('/api/event/:event_id', eventCtrl.getEvent)


//.....TeamMember......

app.get('/api/teammember', teammemberCtrl.getTeammembers )

app.get('/api/teammember/:name', teammemberCtrl.getTeammember )

app.post('/api/teammember', teammemberCtrl.postTeammember)





mongoose.connect('mongodb+srv://Guichi:hola1234@cluster0.clby5.gcp.mongodb.net/apiBD?retryWrites=true&w=majority',(err, res)=>{
    if(err) throw err
    console.log('conexion con la base establecida')
    app.listen(port, () => {
        console.log(`API REST CORRIENDO EN http://localhost:${port}`)
    })
})


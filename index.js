'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { json } = require('body-parser')

const teammemberCtrl = require ('./controllers/teammemberController')
const taskCtrl = require ('./controllers/taskController')
const ceremonyCtrl = require ('./controllers/ceremonyController')
const eventCtrl = require ('./controllers/eventController')
const viewid_nicknameCtrl = require ('./controllers/viewidnicknameController')

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

app.get('/api/task', taskCtrl.getTask)

app.delete('/api/task/:task_id', taskCtrl.deleteTask)

app.put('/api/task/:task_id', taskCtrl.putTask)


//.....Procesos.....



app.get('/api/teammember', teammemberCtrl.getTeammembers )
app.get('/api/teammember/:name', teammemberCtrl.getTeammember )
app.post('/api/teammember', teammemberCtrl.postTeammember)



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

//.....Lauta.....
app.get('/api/viewid_nickname/:id', viewid_nicknameCtrl.getview)
app.get('/api/viewtoda', viewid_nicknameCtrl.getviewtoda)
app.post('/api/viewid_nickname', viewid_nicknameCtrl.postview)


mongoose.connect('mongodb+srv://Guichi:hola1234@cluster0.clby5.gcp.mongodb.net/apiBD?retryWrites=true&w=majority',(err, res)=>{
    if(err) throw err
    console.log('conexion con la base establecida')
    app.listen(port, () => {
        console.log(`API REST CORRIENDO EN http://localhost:${port}`)
    })
})


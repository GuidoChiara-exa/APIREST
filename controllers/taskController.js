'use strict'

const Task = require ('../models/task')
const { json } = require('body-parser')

//metodo post mediante el cual se publica un documento de task en la BDD
async function postTask(req, res){

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
}

//metodo get, que devulve las tareas actuales del proyecto "project"
//el parametro "project" no puede tener espacios
async function getTaskActual(req, res){

    let projectId = req.params.project

    const tasks = await Task.find({"actual" : "true", "project" : projectId})
    res.status(200).json({tasks})
}

async function getTask(req, res){
    const tasks = await Task.find({})
    res.status(200).json({tasks})
}

async function deleteTask(req, res){
    let taskId = req.params.task_id
    const task = await Task.findByIdAndDelete(taskId)
    taskId = task.id_previous
    while (taskId != null){
        let task = await Task.findByIdAndDelete(taskId)
        taskId = task.id_previous
    }
    res.status(200).json({"borrado":"true"})
}

async function putTask(req, res){
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

    await newTask.save((err, taskSaved) => {
        if(err) res.status(500).send({message: `Error al actualizar en la base de datos: ${err}`})
        update.id_previous = taskSaved._id 
        //res.status(200).json({taskSaved}) 
        Task.findByIdAndUpdate(taskId, update, (err,taskUpdated) => {
            if(err) res.status(500).send({message: `Error al actualizar en la base de datos: ${err}`})
            res.status(200).json({update})
        })
    })

}
module.exports = {
    getTask,
    getTaskActual,
    postTask,
    putTask,
    deleteTask
}

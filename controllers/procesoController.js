const Proceso = require("../models/proceso")

function getProcesos(req, res){
    Proceso.find({}, (err, procesos)=> {
        if (err) return res.status(500).send({message: 'error al realizar la peticion'})
        if(!procesos) return res.status(404).send({message:'no existen procesos'})

        res.send(200,{ procesos})
    })
}

function getProceso(id){

}

function saveProceso(){

}

function setProceso(id){
    let procesoID = new Proceso()
    let update = req.body


}

exports = {
    getProcesos,
    getProceso,
    saveProceso,
    setProceso
}
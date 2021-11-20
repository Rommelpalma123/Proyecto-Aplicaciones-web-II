const { response } = require('express')
const { Materia } = require('../models')


const obtenerMaterias= async (req, res = response )=>{

    //GET http://localhost:3000/materias   ?limite=100?desde=1
    const { limite = 10 , desde=0 } =  req.query;
    const query = { estado:true };

    const [ total, materias ] = await Promise.all([
        Materia.countDocuments(query),
        Materia.find(query).skip(Number(desde)).limit(Number(limite))
    ])
  
    res.json({
      total, 
      materias
    })
    
}
const obtenerMateria= async (req, res =  response)=>{
    const {id} = req.params
    const materia=  await Materia.findById(id);
    res.json(materia);
}
const revisarMateria= async (req, res = response)=>{
    const { estado, usuario, ...body } =  req.body;
    
    const existeMateria =  await Materia.findOne({nombre: body.nombre})

    if (existeMateria)
    {
        return res.status(400).json({
            msg:`La materia ${ existeMateria.nombre } esta aprobada`
        })
    }

    const data = {
        ...body,
        nombre: body.nombre
    }

    const materia = new Materia(data);

    const nuevoMateria =  await materia.save();
    res.status(201).json(nuevoMateria);
}
const buscarMateria= async (req, res=response)=>{
    const {id} = req.params;
    const { estado, ...data } =  req.body;
    const materiaEncontrada =  await Materia.findByIdAndUpdate(id,data, {new: true} )
    res.json(materiaEncontrada);
}
const retirarMateria= async (req, res = response)=>{
    const {id} = req.params;
    const materiaEliminada =  await Materia.findByIdAndUpdate(id, {estado:false}, {new:true} );
    res.json(materiaEliminada);
}

module.exports = {
    obtenerMateria,
    obtenerMaterias,
    revisarMateria,
    buscarMateria,
    retirarMateria
};
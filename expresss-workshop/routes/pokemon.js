const express = require('express');
const pokemon = express.Router();
const db = require('../config/database')

//const pk = require('../pokedex.json').pokemon;

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body)
})

pokemon.get('/', async (req, res, next)=> {
    const poki = await db.query("SELECT * FROM pokemon");
    res.status(200).json(poki)
})

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if(id >= 0 && id <= 150){
        console.log(id)
        const pp = await db.query("SELECT * FROM pokemon WHERE pok_id = " + id);
        console.log(pp)
        res.status(200).json(pp)
    }
    else{
        res.status(404).send("pk no encontrado")
    }
    
    /*
    (id >= 0 && id <= 150) ? 
    db.query("SELECT * FROM pokemon WHERE pok_id = " + id) : 
    res.status(404).send("pk no encontrado")
    */
})

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const nombre = req.params.name;
    // condicion ? valor si verdadero :valor si falso [operador ternario]
        console.log(nombre)
        const pp = await db.query("SELECT * FROM pokemon WHERE pok_name = " + nombre)
        console.log(pp)
        res.status(200).json(pp)
  
    /*
    const pkmn = pk.filter((p) => {
        return (p.name.toUpperCase() == nombre.toUpperCase()) ? p : null
    });
    
    (pkmn.length > 0) ? 
    res.status(200).send(pkmn) : 
    res.status(404).send("pk no encontrado")
    */
})

module.exports = pokemon;
const express = require('express');
const pokemon = express.Router();
const db = require('../config/database')

//const pk = require('../pokedex.json').pokemon;

pokemon.post("/", async (req, res, next) => {
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body //deconstruirlas
    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";
        query += ` VALUES('${pok_name}',${pok_height},${pok_weight},${pok_base_experience})`;
        const rows = await db.query(query);
        console.log(rows)
        if(rows.affectedRows==1){
            return res.status(200).json({code: 201, message: "pokemon insertado correctamente"})
        }
        return res.status(500).json({code: 500, message: "ocurrio un error"})    
    }
    return res.status(500).json({code: 500, message: "campos incompletos"})
})

pokemon.get('/', async (req, res, next)=> {
    const poki = await db.query("SELECT * FROM pokemon");
    res.status(200).json({code: 200, message: poki})
})

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if(id >= 0 && id <= 722){
        console.log(id)
        const pp = await db.query("SELECT * FROM pokemon WHERE pok_id = " + id);
        console.log(pp)
        res.status(200).json({code: 200, message: pp})
    }
    else{
        res.status(404).send({code: 404, message:"pk no encontrado"})
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
        const pp = await db.query("SELECT * FROM pokemon WHERE pok_name = '" + nombre+ "';")
        console.log(pp)
        if(pp.length > 0){
            return res.status(200).json({code: 200, message: pp})
        }
        else{
           return res.status(404).json({code: 404, message:"pk no encontrado"})
        }
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
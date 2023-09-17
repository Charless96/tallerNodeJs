const express = require('express');
const pokemon = express.Router();
const pk = require('../pokedex.json').pokemon;

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body)
})

pokemon.get("/",(req, res, next)=> {
    res.status(200).send(pk);
})

pokemon.get('/:id([0-9]{1,3})', (req, res, next) => {
    const id = req.params.id -1;
    (id >= 0 && id <= 150) ? 
    res.status(200).send(pk[req.params.id - 1]) : 
    res.status(404).send("pk no encontrado")
})

pokemon.get('/:name([A-Za-z]+)', (req, res, next) => {
    const nombre = req.params.name;
    // condicion ? valor si verdadero :valor si falso [operador ternario]
    const pkmn = pk.filter((p) => {
        return (p.name.toUpperCase() == nombre.toUpperCase()) ? p : null
    });
    
    (pkmn.length > 0) ? 
    res.status(200).send(pkmn) : 
    res.status(404).send("pk no encontrado")
})

module.exports = pokemon;
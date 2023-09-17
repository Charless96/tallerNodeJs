const bodyparser = require('body-parser');
const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json');
//las llaves extraen el elemento que se esta pidiendo
/*
verbos http
get cada vez que se utiliza una url en el navegador
post cuando se requiere guardar datos
patch actuzliar datos (un solo dato)
put "" (todos los elementos)
delete eliminar un recurso
*/
app.use(express.json()); //use para que una funcion se le aplique a todas las peticiones middleware
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next)=> {
    res.status(200).send("Bienvenido al pokedex");
})

app.post("/pokemon", (req, res, next) => {
    return res.status(200).send(req.body)
})

app.get("/pokemon",(req, res, next)=> {
    res.status(200).send(pokemon);
})

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
    const id = req.params.id -1;
    (id >= 0 && id <= 150) ? 
    res.status(200).send(pokemon[req.params.id - 1]) : 
    res.status(404).send("pokemon no encontrado")
})

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {
    const nombre = req.params.name;
    // condicion ? valor si verdadero :valor si falso [operador ternario]
    const pk = pokemon.filter((p) => {
        return (p.name.toUpperCase() == nombre.toUpperCase()) ? p : null
    });
    
    (pk.length > 0) ? 
    res.status(200).send(pk) : 
    res.status(404).send("pokemon no encontrado")
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log("server is running...");
})

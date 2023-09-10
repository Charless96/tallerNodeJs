const express = require('express');
const app = express();
const pokedex = require('./pokedex.json')

/*
verbos http
get cada vez que se utiliza una url en el navegador
post cuando se requiere guardar datos
patch actuzliar datos (un solo dato)
put "" (todos los elementos)
delete eliminar un recurso
*/

app.listen(3000,() =>{

    app.get("/", (req, res, next) =>{
        res.status(200);
        const pokedex = pokedex.pokemon;
        res.send(pokemon);
    })

    app.get("/:name",(req, res, next) => {
        console.log(req.params.name);
        res.status(200)
        res.send("hola, " + req.params.name)
    })

    app.listen(process.env.PORT || 3000, () => {
        console.log("server is running...")
    })
})
const morgan = require('morgan')
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon')
const user = require('./routes/user')
//las llaves extraen el elemento que se esta pidiendo
/*
verbos http
get cada vez que se utiliza una url en el navegador
post cuando se requiere guardar datos
patch actuzliar datos (un solo dato)
put "" (todos los elementos)
delete eliminar un recurso
*/
app.use(morgan('dev'));
app.use(express.json()); //use para que una funcion se le aplique a todas las peticiones middleware
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res, next)=> {
    res.status(200).json({code: 1, message:"Bienvenido al pokedex"});
});

app.use("/pokemon",pokemon);

app.use("/user", user)

app.use((req, res, next)  => {
    return res.status(404).json({code:404, message: "url no encontrada"});
});

app.listen(process.env.PORT || 3000, ()=> {
    console.log("server is running...");
});

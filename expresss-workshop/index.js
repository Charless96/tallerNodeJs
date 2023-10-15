//Dependencias
const morgan = require('morgan')
const express = require('express');
const app = express();
//routers
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');
//middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');
//las llaves extraen el elemento que se esta pidiendo
/*
verbos http
get cada vez que se utiliza una url en el navegador
post cuando se requiere guardar datos
patch actuzliar datos (un solo dato)
put "" (todos los elementos) 
delete eliminar un recurso
*/
app.use(cors);
app.use(morgan('dev'));
app.use(express.json()); //use para que una funcion se le aplique a todas las peticiones middleware
app.use(express.urlencoded({ extended: true }));


app.get("/", index);

app.use("/user", user);

app.use(auth);

app.use("/pokemon",pokemon);

app.use(notFound);

app.listen(process.env.PORT || 3000, ()=> {
    console.log("server is running...");
});

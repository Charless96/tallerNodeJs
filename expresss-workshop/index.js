const express = require('express');
const app = express();

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
        res.send("hello world");
    })

    console.log("server is running...")

})
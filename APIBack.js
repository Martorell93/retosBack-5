//Reto 1
//Creación del servidor y uso de archivos JSON
const express = require("express");
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
const cors = require("cors");
app.use(cors());

//Import clase Professional
const professional = require("./professional");

let persona = null;
let pro = null;
let profesionales = [];

//Método GET Portada
app.get("/", function (request, response) 
{
    let respuesta = {error: true, código: 200, mensaje: "Punto de inicio"};
    response.send(respuesta);
    console.log("Se ha entrado en Portada");
})

//Método GET professional con su filtro sobre id
app.get("/profesionales", 
    function(request, response)
        {
            let id = request.query.id;
            let respuesta;

            if (profesionales.length != 0 && id) {
                respuesta = profesionales[id];
                console.log("Se ha pedido un GET sobre la posicion: " + id);
            }
            else if (profesionales != 0) {
                if (profesionales.length != 0) {
                    respuesta = profesionales;
                }
                else {
                    respuesta = {error: 200, mesaje: "Profesionales no existe"};
                }
            }
            else {
                respuesta = {error: true, codigo: 200,
                            mensaje: "El profesional no existe"};
            }
            response.send(respuesta);
});

//Método POST professional
app.post("/profesionales", function (request, response) {
    let respuesta;
        let name = request.body.name;
        let age = request.body.age;
        let genre = request.body.genre;
        let nationality = request.body.nationality;
        let profession = request.body.profession;

        pro = new professional.Professional(name, age,
        genre, nationality, profession);
        profesionales.push(pro);
        respuesta = {error: false, codigo: 200,
            mensaje: "Pro añadido a la lista", 
            resultado: pro,
            lista: profesionales};
        console.log("Pro añadido a la lista");
        response.send(respuesta);
        console.log(pro);
});

//Método PUT professional
app.put("/profesionales", function(request, response) {
    let respuesta;
    if (profesionales.length != 0) {
        let posicion = request.body.posicion;
        pro = profesionales[posicion];
        for (let i in request.body) {
            if (request.body[i] != null && request.body.i != "posicion") {
                    pro[i] = request.body[i];
            }
        }
        console.log("Se ha actualizado al Profesional de la posicion: " + posicion);
        respuesta = pro;
    }
    else {
            respuesta = {error: true, codigo: 200,
                    mensaje: "Profesional no existe",
                    resultado: null};
    }
    response.send(respuesta);
});

//Método DELETE del recurso/objeto
app.delete("/profesionales", function (request, response) {
    let respuesta;
    if (profesionales.length != 0) {
        let posicion = request.body.posicion;
        console.log(posicion);
        profesionales.splice(posicion, 1);
        console.log(profesionales);
        respuesta = {error: false, codigo: 200,
            mensaje: "Profesional borrado",
            lista: profesionales};
        console.log("Se ha eliminado al profesional que estaba en la posicion: " + posicion);
    }
    else {
        respuesta = {error: true, codigo: 200,
                    mensaje: "No hay profesionales"};
    }
    response.send(respuesta);
});

app.listen(4000);
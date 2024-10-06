const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware para procesar JSON, Mostrar la página web principal de la aplicación cuando se accede a la ruta raíz del servidor (/).
app.use(express.json());

// Ruta para devolver el archivo HTML
const index = path.join(__dirname, "index.html");

//Se utiliza para manejar la ruta principal ("/") de tu aplicación. Esta ruta responde a las solicitudes GET a la URL raíz (por ejemplo, http://localhost:3000/)
app.get("/", (req, res) => {
    res.sendFile(index);
});

//GET /canciones: Devuelve todas las canciones almacenadas en el archivo
app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
    res.json(canciones);
});

//POST /canciones: Añade una nueva canción al repertorio.
app.post("/canciones", (req, res) => {
    console.log(req.body);
});

//PUT /canciones/: Edita la canción con el ID proporcionado en la URL
app.put("/canciones/:id", (req, res) => {
    const {id} = req.params
});

//DELETE /canciones/: Elimina la canción con el ID proporcionado.
app.delete("/canciones/:id", (req, res) => {
    const {id} = req.params
});

// Iniciar el servidor
app.listen(3000, console.log("Servidor levantado en el puerto 3000!"));
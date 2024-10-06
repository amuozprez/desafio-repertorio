const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

const index = path.join(__dirname, "index.html");

app.get("/", (req, res) => {
    res.sendFile(index);
});

app.get("/canciones", (req, res) => {
    try {
        const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
        res.json(canciones);
    } catch (error) {
        res.status(500).json({ error: "Error al leer el archivo JSON" });
    }
});

app.post("/canciones", (req, res) => {
    try {
        const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
        const nuevaCancion = req.body;
        canciones.push(nuevaCancion);

        fs.writeFileSync("repertorio.json", JSON.stringify(canciones, null, 2));
        res.status(201).json({ message: "Canción agregada", nuevaCancion });
    } catch (error) {
        res.status(500).json({ error: "Error al guardar la canción" });
    }
});

app.put("/canciones/:id", (req, res) => {
    try {
        const { id } = req.params;
        let canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
        const indice = canciones.findIndex(cancion => cancion.id == id);

        if (indice !== -1) {
            canciones[indice] = { ...canciones[indice], ...req.body };
            fs.writeFileSync("repertorio.json", JSON.stringify(canciones, null, 2));
            res.json({ message: "Canción actualizada", cancion: canciones[indice] });
        } else {
            res.status(404).json({ error: "Canción no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la canción" });
    }
});

app.delete("/canciones/:id", (req, res) => {
    try {
        const { id } = req.params;
        let canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
        const nuevasCanciones = canciones.filter(cancion => cancion.id != id);

        if (canciones.length === nuevasCanciones.length) {
            return res.status(404).json({ error: "Canción no encontrada" });
        }

        fs.writeFileSync("repertorio.json", JSON.stringify(nuevasCanciones, null, 2));
        res.json({ message: "Canción eliminada" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la canción" });
    }
});

app.listen(3000, () => {
    console.log("Servidor levantado en el puerto 3000!");
});

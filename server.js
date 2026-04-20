const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

// REQUISITO: Información volátil en un MAPA 
const productos = new Map(); 

// API REST [cite: 45]
app.get('/api/productos', (req, res) => res.json(Array.from(productos.values())));

app.post('/api/productos', (req, res) => {
    const { id, nombre, precio } = req.body;
    productos.set(id, { id, nombre, precio });
    res.status(201).send("Creado");
});

// REQUISITO: Operación PATCH [cite: 46]
app.patch('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    if (productos.has(id)) {
        const actual = productos.get(id);
        productos.set(id, { ...actual, ...req.body }); // Solo actualiza lo que envíes
        res.send("Actualizado");
    } else { res.status(404).send("No encontrado"); }
});

app.listen(3000, () => console.log("Danielshop S.L. - Solo Parte I lista"));

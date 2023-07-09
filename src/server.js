const express = require('express');
const { connectToCollection, desconnect, generateId } = require('./mongodb.js');

const server = express();

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Obtener todos los discos (filtros opcionales): Ruta GET http://127.0.0.1:3000/discos
server.get('/discos', async (req, res) => {
    const { artista } = req.query;
    let discos = [];

    try {
        const collection = await connectToCollection('discos');
        if (artista) discos = await collection.find({ artista }).toArray();
        else discos = await collection.find().sort({artista: 1 }).toArray();

        if (discos.length === 0) return res.status(400).send('Error. El Artista no existe en la Coleccion.');

        res.status(200).send(JSON.stringify(discos, null, '\t'));
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Hubo un error en el servidor');
    } finally {
        await desconnect();
    }
});

// Obtener un disco específico por id: Ruta GET http://127.0.0.1:3000/discos/1
server.get('/discos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const collection = await connectToCollection('discos');
        const disco = await collection.findOne({ id: { $eq: Number(id) } });

        if (!disco) return res.status(400).send('Error. El Id no corresponde a un disco existente.');

        res.status(200).send(JSON.stringify(disco, null, '\t'));
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Hubo un error en el servidor');
    } finally {
        await desconnect();
    }
});


// Crear un nuevo disco: Ruta POST http://127.0.0.1:3000/discos
server.post('/discos', async (req, res) => {
    const { artista, descripcion, genero, precio, stock } = req.body;

    if (!artista && !descripcion && !genero && !precio && !stock) {
        return res.status(400).send('Error. Faltan datos de relevancia.');
    }

    try {
        const collection = await connectToCollection('discos');
        const disco = { id: await generateId(collection), artista, descripcion, genero, precio: Number(precio), stock: Number(stock) };


        await collection.insertOne(disco);

        res.status(200).send(JSON.stringify(disco, null, '\t'));
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Hubo un error en el servidor');
    } finally {
        await desconnect();
    }
});

// Actualizar un disco específico por id: Ruta PUT http://127.0.0.1:3000/discos/1
server.put('/discos/:id', async (req, res) => {
    const { id } = req.params;
    const { artista, descripcion, genero, precio, stock } = req.body;
    const disco = { artista, descripcion, genero, precio: Number(precio), stock: Number(stock) };

    if (!id && !artista && !descripcion && !genero && !precio && !stock) {
        return res.status(400).send('Error. Faltan datos de relevancia.');
    }

    try {
        const collection = await connectToCollection('discos');
        await collection.updateOne({ id: Number(id) }, { $set: disco});

        res.status(200).send(JSON.stringify(disco, null, '\t'));
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Hubo un error en el servidor');
    } finally {
        await desconnect();
    }
});

// Modificar datos de un disco específico por id: Ruta Patch http://127.0.0.1:3000/discos/1
server.patch('/discos/:id', async (req, res) => {
    const { id } = req.params;
    const { artista, descripcion, genero, precio, stock } = req.body;
    const disco = {};

    if (artista) disco.artista = artista;
    if (descripcion) disco.descripcion = descripcion;
    if (genero) disco.genero = genero;
    if (precio) disco.precio = Number(precio);
    if (stock) disco.stock = Number(stock);

    try {
        const collection = await connectToCollection('discos');
        await collection.updateOne({ id: Number(id) }, { $set: disco});

        res.status(200).send(JSON.stringify(disco, null, '\t'));
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Hubo un error en el servidor');
    } finally {
        await desconnect();
    }
});

// Eliminar un disco específico por id: Ruta DELETE http://127.0.0.1:3000/discos/1
server.delete('/discos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const collection = await connectToCollection('discos');
        await collection.deleteOne({ id: { $eq: Number(id) } });

        res.status(200).send('Eliminado');
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Hubo un error en el servidor');
    } finally {
        await desconnect();
    }
});

// Control de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send(`<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>`);
});

// Método oyente de peteciones
server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Ejecutandose en http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/discos`);
});
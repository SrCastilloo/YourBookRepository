const express = require('express');
const router = express.Router();
const {getDB} = require('../db/connection');
const multer = require('multer');
const {ObjectId} = require('mongodb');
const path = require('path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); //carpeta donde se guardarán las fotos
    },
    filename: function (req, file, cb) {
        const nombreUnico = Date.now() + path.extname(file.originalname); //obtenemos la extensión del archivo original
        cb(null, nombreUnico); //nombre único para cada foto
    }
});

const upload = multer({ storage: storage }); //middleware para manejar fotos




//endpoint para obtener todos los libros
router.get('/', async (req, res) => {
    try
    {
        const db = getDB(); //obtenemos la instancia de la base de datos para usarla en las rutas

        const libros = await db.collection('libros').find().toArray();
        res.json(libros);
    }catch (error)
    {
        console.error('Error al obtener los libros:', error);
        res.status(500).json({error: 'Error al obtener los libros'});
    }
});



//endpoint para crear un nuevo libro
router.post('/crearLibro', upload.single('foto'), async (req, res) => {
    try
    {   
        const db = getDB(); //obtenemos la instancia de la base de datos para usarla en las rutas

        const {titulo,precio,autor,paginas_totales,genero,seccion} = 
        req.body;

        const nuevoLibro = {
            titulo,
            precio: Number(precio), //convertimos el precio a número
            autor,
            paginas_totales: Number(paginas_totales), //convertimos paginas_totales a número
            paginas_leidas: 0, //paginas_leidas inicia en 0
            genero,
            seccion,
            foto: req.file ? req.file.filename : null //si se subió una foto, guardamos su nombre, si no, guardamos null
        };

        const resultado = await db.collection('libros').insertOne(nuevoLibro);
        res.json({message: 'Libro creado exitosamente', id: resultado.insertedId});
    }
    catch (error){
        console.error('Error al crear el libro:', error);
        res.status(500).json({error: 'Error al crear el libro'});
    }
});   



//endpoint para actualizar paginas leidas de un libro
router.put('/actualizarPaginasLeidas/:id',async (req, res) => {

    try 
    {
        const db = getDB(); //obtenemos la instancia de la base de datos para usarla en las rutas

        //buscamos el libro por su id
        const idLibro = req.params.id;
        const paginasLeidas = req.body.paginasLeidas;

        const resultado = await db.collection('libros').updateOne(
            {_id: new ObjectId(idLibro)},
            {$set: {paginas_leidas: Number(paginasLeidas)}} //al documento encontrado, le cambiamos 
            // el campo paginas_leidas por el nuevo valor
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({error: 'Libro no encontrado'});
        }
        
        res.json({message: 'Páginas leídas actualizadas exitosamente'});

    }catch (error)
    {
        console.error('Error al actualizar las páginas leídas:', error);
        res.status(500).json({error: 'Error al actualizar las páginas leídas'});
    }


});



//enpoint para actualizar un libro
router.put('/actualizarLibro/:id', upload.single('foto'), async (req, res) => {
    try
    {
        const db = getDB(); //obtenemos la instancia de la base de datos para usarla en las rutas
        const libroId = req.params.id;
        const {titulo,precio,autor,paginas_totales,genero,seccion, foto} = req.body;

        const nuevoLibro = {
            titulo,
            precio: Number(precio), //convertimos el precio a número
            autor,
            paginas_totales: Number(paginas_totales), //convertimos paginas_totales a número
            genero,
            seccion,
            foto: req.file ? req.file.filename : foto //si se subió una nueva foto, guardamos su nombre, si no, mantenemos la foto anterior
        };

        const resultado = await db.collection('libros').updateOne(
            {_id: new ObjectId(libroId)},
            {$set: nuevoLibro}
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({error: 'Libro no encontrado'});
        }

        res.json({message: 'Libro actualizado exitosamente'});

    }catch (error)
    {
        console.error('Error al actualizar el libro:', error);
        res.status(500).json({error: 'Error al actualizar el libro'});
    }
});



//endpoint para eliminar un libro

router.delete('/eliminarLibro/:id', async (req, res) => {
    try
    {
        const db = getDB(); //obtenemos la instancia de la base de datos para usarla en las rutas
        const libroId = req.params.id;

        const resultado = await db.collection('libros').deleteOne(
            {_id: new ObjectId(libroId)}
        );

        if (resultado.deletedCount === 0) {
            return res.status(404).json({error: 'Libro no encontrado'});
        }

        res.json({message: 'Libro eliminado exitosamente'});

    }catch (error)
    {
        console.error('Error al eliminar el libro:', error);
        res.status(500).json({error: 'Error al eliminar el libro'});
    }
});


module.exports = router;
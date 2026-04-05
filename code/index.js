
const express = require('express'); //importamos express para crear el servidor
const app = express(); //creamos una instancia de express
app.use(express.json());//middleware para parsear el cuerpo de las solicitudes como JSON

const dotenv = require('dotenv'); //importamos dotenv para cargar las variables de entorno
dotenv.config(); //cargamos las variables de entorno desde el archivo .env



const {connectDB} = require('./db/connection'); //importamos la función para conectar a la base de datos
const booksRoutes = require('./routes/books.routes'); //importamos las rutas de libros






//montamos las rutas
app.use('/libros', booksRoutes); //indicamos que vaya a buscar las rutas de libros cuando se acceda a /libros



//iniciamos el servidor y la conexión a la base de datos
const PORT = process.env.PORT || 3000;

async function startServer()
{
    try
    {
        await connectDB(); //conectamos a la base de datos
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });

    }catch (error)
    {
        console.error('Error al iniciar el servidor:', error);
    }   
}

startServer(); //iniciamos el servidor










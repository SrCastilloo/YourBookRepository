const {MongoClient, ServerApiVersion} = require('mongodb');

const uri = process.env.MONGODB_URI; //obtenemos la URI de MongoDB desde las variables de entorno

//creamos una instancia del cliente de MongoDB
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});




//variable para guardar la base de datos una vez establecida la conexión
let db;


//conexion a MongoDB
async function connectDB()
{
    try
    {
        await client.connect();
        db = client.db(process.env.DB_NAME);

        console.log('Conexión a MongoDB establecida');


    }catch (error)
    {
        console.error('Error al conectar a MongoDB:', error);
    }

}


function getDB()
{
    if (!db)
    {
        throw new Error('La conexión a la base de datos no se ha establecido');
    }
    return db;
}

module.exports = { connectDB, getDB };
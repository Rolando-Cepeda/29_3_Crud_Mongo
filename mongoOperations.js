//1.- Importamos MongoClient de mongodb
// MongoClient es una CLASE que nos permite conectarnos a una base de datos de MongoDB y realizar operaciones sobre ella.
const { MongoClient } = require('mongodb');

//2.- mydb es el nombre de la base de datos que vamos a crear o a la que nos vamos a conectar.
const mydb = "Empresa";
//3.- url es la URL de la base de datos a la que nos vamos a conectar.
const url = "mongodb://127.0.0.1:27017/";

//4.- Función para CONECTARNOS a MongoDB:
//Esta función crea un cliente(instancia) de MongoDB y se conecta a la base de datos(servidor) que le pasemos como argumento.
async function connectToMongo() {
    const client = new MongoClient(url);
    await client.connect();//Hace efectiva la conexion
    return client;//Devuelve la conexion
}

//5.-CREAR o CONECTAR a una base de datos:
//Se conecta al servidor y CREA(o se CONECTA si ya existe) la base de datos llamada "Empresa".
//La base de datos la pasamos como argumento(la inicializamos antes: mydb) a la función.
async function crearBaseDeDatos() {
    const client = await connectToMongo();
    const db = client.db(mydb);// Método db.- Conecta a la base de datos "Empresa"
    console.log(`Base de datos '${mydb}' creada o conectada.`);// Imprime en la consola que la base de datos ha sido creada o conectada.
    await client.close(); // Cierra la conexión al servidor MongoDB.
}


//6.- Crear una COLECCIÓN dentro de la base de datos:
// Crea una nueva colección(como una tabla en SQL) llamada colección
async function crearColeccion(coleccion) {
    const client = await connectToMongo();//Usa connectToMongo() para conectarse al servidor MongoDB.
    const db = client.db(mydb);// Obtiene la base de datos Empresa.
    //Crea una colección nueva en la base de datos usando db.createCollection(coleccion).
    await db.createCollection(coleccion);
    console.log(`Colección '${coleccion}' creada.`);// Imprime en la consola que la colección ha sido creada.
    await client.close();// Cierra la conexión al servidor MongoDB.
}


// 7.- Insertar dentro de una coleccion de una BD
// Función para insertar un documento dentro de una coleccion de una BD.
// Inserta un nuevo documento(registro) en la colección especificada.
async function insertarDocumento(coleccion, documento) {
    const client = await connectToMongo(); // Usa connectToMongo() para conectarse al servidor MongoDB.
    const db = client.db(mydb);// Obtiene la base de datos Empresa.
    const collection = db.collection(coleccion); //Obtiene la colección especificada usando db.collection(coleccion).
    // Inserta el documento en la colección usando collection.insertOne(documento) JSON clave:valor
    const resultado = await collection.insertOne(documento);
    console.log(`Documento insertado con ID: ${resultado.insertedId}`);// Imprime en la consola el ID del documento insertado.
    await client.close();// Cierra la conexión al servidor MongoDB.
}


// 8.- Obtener datos del PRIMER ELEMENTO dentro de una colección.
// Recupera el primer documento(registro) encontrado en la colección.
async function obtenerPrimerElemento(coleccion) {
    const client = await connectToMongo();// Usa connectToMongo() para conectarse al servidor MongoDB.
    try {
        const db = client.db(mydb);// Obtiene la base de datos Empresa.
        const collection = db.collection(coleccion);// Obtiene la colección especificada.
        //Encuentra el primer documento en la colección usando collection.findOne({}).
        const result = await collection.findOne({});
        console.log(result.nombre);//Imprime el nombre del primer documento encontrado.
        return result;// Devuelve el primer documento encontrado.
    } finally {
        await client.close();// Cierra la conexión al servidor MongoDB en cualquier caso (éxito o error).
    }
}

// 9.- Ver TODOS los elementos de una colección.
// Recupera todos los documentos(registros) y los muestra en la consola.
async function verTodos(coleccion) {
    const client = await connectToMongo();//Usa connectToMongo() para conectarse al servidor MongoDB.
    try {
        const db = client.db(mydb);// Obtiene la base de datos Empresa.
        const collection = db.collection(coleccion);// Obtiene la colección especificada.
        //Encuentra todos los documentos en la colección usando collection.find({}).toArray().
        const result = await collection.find({}).toArray();
        console.log(result);// Imprime todos los documentos encontrados en la consola.
        return result;// Devuelve todos los documentos encontrados.
    } finally {
        await client.close();// Cierra la conexión al servidor MongoDB en cualquier caso (éxito o error).
    }
}

// 10.- Realizar una QUERY (consulta) simple.
// Realiza una búsqueda en la colección segun un criterio específico(query) que le pasemos como argumento.
async function querySimple(coleccion, query) {
    const client = await connectToMongo();// Usa connectToMongo() para conectarse al servidor MongoDB.
    
    try {
        const db = client.db(mydb);// Obtiene la base de datos Empresa.
        const collection = db.collection(coleccion);// Obtiene la colección especificada.
        // Encuentra los documentos que cumplen con el criterio de búsqueda (query) usando collection.find(query).toArray().
        const result = await collection.find(query).toArray();
        console.log(result);// Imprime los documentos encontrados en la consola.
        return result;// Devuelve los documentos encontrados.
    } finally {
        await client.close();// Cierra la conexión al servidor MongoDB en cualquier caso (éxito o error).
    }
}

// 11.- Sort por un criterio (campo)
// Función para ordenar los documentos de una colección por un campo específico.
 /* Ordena los documentos en la colección por el campo especificado (campo) y
    orden (1 para ascendente, -1 para descendente).
*/
async function sortPorCampo(coleccion, campo, orden = 1) {
    const client = await connectToMongo();// Usa connectToMongo() para conectarse al servidor MongoDB.
    try {
        const db = client.db(mydb);// Obtiene la base de datos Empresa.
        const collection = db.collection(coleccion);// Obtiene la colección especificada.
        /* Encuentra y ordena los documentos por el campo especificado (campo) y el
        orden (ascendente o descendente) usando collection.find().sort({ [campo]: orden }).toArray().*/
        const result = await collection.find().sort({ [campo]: orden }).toArray();
        console.log(result);//Imprime los documentos ordenados en la consola.
        return result;// Devuelve los documentos ordenados.
    } finally {
        await client.close();// Cierra la conexión al servidor MongoDB en cualquier caso (éxito o error).
    }
}


// 12 Borrar un documento según un filtro: 
// Borra el documento que cumple con el criterio(filtro) especificado.
async function borrarDocumento(coleccion, filtro) {
    const client = await connectToMongo();// Usa connectToMongo() para conectarse al servidor MongoDB.
    const db = client.db(mydb);// Obtiene la base de datos Empresa.
    const collection = db.collection(coleccion);// Obtiene la colección especificada.
    // Borra el documento que cumple con el filtro (filtro) usando collection.deleteOne(filtro).
    const resultado = await collection.deleteOne(filtro);
    console.log(`${resultado.deletedCount} documento(s) borrado(s).`);//Imprime en la consola cuántos documentos fueron borrados.
    await client.close();// Cierra la conexión al servidor MongoDB
}


// 13.- Actualizar un documento según un filtro:
// Actualiza el documento que cumple con el criterio (filtro) con los nuevos datos proporcionados (actualizacion).
async function actualizarDocumento(coleccion, filtro, actualizacion) {
    const client = await connectToMongo();// Usa connectToMongo() para conectarse al servidor MongoDB.
    const db = client.db(mydb);// Obtiene la base de datos Empresa.
    const collection = db.collection(coleccion);// Obtiene la colección especificada.
    /* Actualiza el documento que cumple con el filtro (filtro) con los nuevos
    datos proporcionados (actualizacion) usando collection.updateOne(filtro, { $set: actualizacion }). */
    const resultado = await collection.updateOne(filtro, { $set: actualizacion });
    console.log(`${resultado.modifiedCount} documento(s) actualizado(s).`);// Imprime en la consola cuántos documentos fueron actualizados.
    await client.close();// Cierra la conexión al servidor MongoDB.
}

// 14.- Exportamos las funciones para poder usarlas en otros archivos.
// Esto permite que otras partes del código(como app.js) puedan usar éstas funciones.
module.exports = {
    crearBaseDeDatos,
    crearColeccion,
    insertarDocumento,
    obtenerPrimerElemento,
    verTodos,
    querySimple,
    sortPorCampo,
    borrarDocumento,
    actualizarDocumento
};


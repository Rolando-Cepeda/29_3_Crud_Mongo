// Importamos las funciones del archivo mongoOperations.js:
/* 
Cómo funciona: Usamos require para importar las funciones exportadas en
mongoOperations.js, así podemos usarlas en este archivo.
*/
const {
    crearBaseDeDatos,
    crearColeccion,
    insertarDocumento,
    obtenerPrimerElemento,
    verTodos,
    querySimple,
    sortPorCampo,
    borrarDocumento,
    actualizarDocumento
  } = require('./mongoOperations');
  
  /* 
  16.- En esta función, estamos llamando a todas las operaciones CRUD de manera secuencial
  para demostrar cómo funcionan
  */
  async function ejecutarOperaciones() {
    await crearBaseDeDatos();// Crea o se conecta a la base de datos Empresa.
    await crearColeccion('Clientes');//Crea una colección llamada Clientes en la base de datos Empresa.
    await insertarDocumento('Clientes', { nombre: 'Juan', edad: 30 });//Inserta un documento con nombre 'Juan' y edad 30 en la colección Clientes.
    await insertarDocumento('Clientes', { nombre: 'Ana', edad: 48 });// Inserta un documento con nombre 'Ana' y edad 48 en la colección Clientes.
    await insertarDocumento('Clientes', { nombre: 'Rita', edad: 27 });// Inserta un documento con nombre 'Rita' y edad 27 en la colección Clientes.
    await obtenerPrimerElemento("Clientes");// Obtiene el primer documento en la colección Clientes y lo imprime en la consola.
    await verTodos("Clientes");// Obtiene todos los documentos en la colección Clientes y los imprime en la consola.
    await querySimple("Clientes", { nombre: 'Ana'});// Busca documentos en la colección Clientes donde el nombre sea 'Ana' y los imprime en la consola.
    await sortPorCampo("Clientes","nombre");// Ordena los documentos en la colección Clientes por el campo nombre en orden ascendente y los imprime en la consola.
    await actualizarDocumento('Clientes', { nombre: 'Ana' }, { edad: 31 });// Actualiza el documento donde el nombre sea 'Ana' y cambia la edad a 31.
    await borrarDocumento('Clientes', { nombre: 'Juan' });// Borra el documento donde el nombre sea 'Juan'.
  }
  
  // 17.- Propósito: Ejecutar la función ejecutarOperaciones y manejar posibles errores.
  /* Cómo funciona: Llamamos a ejecutarOperaciones() y si ocurre algún error, lo capturamos
  y lo imprimimos en la consola usando console.error. */
  ejecutarOperaciones().catch(console.error);
/* 
EXPLICACIÓN GENERAL
El archivo app.js es un script que demuestra cómo utilizar las funciones definidas en mongoOperations.js.
Primero, importamos todas las funciones necesarias desde mongoOperations.js.

Luego, definimos una función ejecutarOperaciones que llama a estas funciones en una secuencia
específica para realizar varias operaciones CRUD en la base de datos Empresa.

Finalmente, ejecutamos ejecutarOperaciones y nos aseguramos de manejar cualquier error
que pueda ocurrir durante la ejecución.

Este flujo secuencial muestra cómo puedes realizar operaciones comunes en MongoDB usando Node.js,
proporcionando un ejemplo práctico y completo de cómo interactuar con una base de datos MongoDB.
*/
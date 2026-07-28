// requiero las librerias y herramientas que voy a necesitar usar 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();// carga variables y archivo oculto .env




// ***** configuro express y el puerto donde va a escuchar el servidor **************//
const contacto = require('./models/contacto');// importo el modelo de contacto para poder usarlo en las rutas y guardar los datos en la base de datos
const app = express()//ejecuto express y lo guardo en la variable  app, ahora puedo usar app para crear rutas y escuchar peticiones
const port = process.env.PORT || 5000;// puerto donde va a escuchar el servidor, si no hay puerto en el archivo .env, usa el 5000
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    console.error('❌ Error: no se encontró la variable MONGO_URI en el archivo .env');
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Conectado a la base de datos MongoDB');
        app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto ${port}`);
        });
    })
    .catch((error) => console.error('❌ Error al conectar a MongoDB:', error));

// *****middlewares los filtros que se ejecutan antes de llegar a las rutas, para procesar la informacion que llega al servidor.*********

app.use(cors());
app.use(express.json());//  este middleware es necesario para convertir en objetos los datos que llegan en formato json.
app.use(express.urlencoded({ extended: true })); // este middleware permite leer formularios HTML tradicionales



// ********** Rutas de atencion a las peticiones GET*****************//
app.get('/', (req, res) => {// ruta responde cuando alguien consulta la url raiz del servidor.
    res.send('Hola mundo desde el servidor de Node.js');
});
app.get('/api/contactos', async (req, res) => { // ruta responde cuando alguien consulta la url /api/contacto
    try {
        const contactos = await contacto.find(); // busco todos los contactos en la base de datos
        res.status(200).json(contactos); // devuelvo los contactos en formato json
    } catch (error) {
        console.error('Error al obtener los contactos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los contactos' });
    }
});



// ********** Rutas de atencion a las peticiones POST*****************//
app.post('/api/contacto', async (req, res) => { 
    const { nombre, email, mensaje } = req.body; // extraigo los datos del cuerpo de la peticion
    // validar los datos recibidos en el servidor
    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    console.log('Datos recibidos del formulario de contacto:');
    console.log(`De: ${nombre} (${email})`);
    console.log(`Mensaje: ${mensaje}`); 

    try {
        const nuevoContacto = new contacto({ nombre, email, mensaje });
        const contactoGuardado = await nuevoContacto.save();
        console.log('Contacto guardado en MongoDB:', contactoGuardado);
        res.status(201).json({ mensaje: 'Formulario de contacto guardado con éxito', contacto: contactoGuardado });
    } catch (error) {
        console.error('Error al guardar contacto en MongoDB:', error);
        res.status(500).json({ mensaje: 'Error al guardar el contacto en la base de datos' });
    }
});
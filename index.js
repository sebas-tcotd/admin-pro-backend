const express = require('express');

//Crear el servidor de express
const app = express();

// bVvOa5kqtgFbY25u
// mean_user

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
});


// Montar el servidor de express
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
})
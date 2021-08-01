require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Crear el servidor de express
const app = express();

//Configuración del CORS
app.use(cors());

// Lectura y parsing del body
app.use(express.json());

// Base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'))

// Montar el servidor de express
app.listen(process.env.PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${process.env.PORT}`);
});

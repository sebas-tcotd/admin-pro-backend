/* Ruta: 'api/todo/:termino' */

const { Router } = require('express');
const { check } = require('express-validator');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:term', [ validarJWT ], getTodo);

router.get('/colection/:table/:term', validarJWT, getDocumentosColeccion);

module.exports = router;

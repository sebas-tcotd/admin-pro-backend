/* Ruta: 'api/todo/:termino' */

const { Router } = require('express');
const { check } = require('express-validator');
const { getTodo } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:term', [ validarJWT ], getTodo);

module.exports = router;

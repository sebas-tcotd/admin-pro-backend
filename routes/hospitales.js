/*
 Ruta: '/api/hospitales'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital
} = require('../controllers/hospitales');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getHospitales);
router.post('/',
  [
    validarJWT,
    check('name', 'El nombre del hospital es necesario.').not().isEmpty(),
    validarCampos
  ],
  crearHospital);

router.put('/:id',
  [
    validarJWT,
    check('name', 'El nombre del hospital es necesario.').not().isEmpty(),
    validarCampos
  ],
  actualizarHospital);

router.delete('/:id', [validarJWT, borrarHospital], borrarHospital);

module.exports = router;


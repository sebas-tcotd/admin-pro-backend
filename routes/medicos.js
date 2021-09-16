/*
  Ruta: '/api/medicos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicoById
} = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getMedicos);

router.get('/:id', validarJWT, getMedicoById);

router.post('/',
  [
    validarJWT,
    check('name', 'El nombre del médico es necesario.').not().isEmpty(),
    check('hospital', 'El ID del hospital debe de ser válido').isMongoId(),
    validarCampos
  ],
  crearMedico);

router.put('/:id',
  [
    validarJWT,
    check('name', 'El nombre del médico debe de ser válido.').not().isEmpty(),
    check('hospital', 'El ID del hospital debe de ser válido').isMongoId(),
    validarCampos
  ],
  actualizarMedico);

router.delete('/:id', validarJWT, borrarMedico);


module.exports = router;



/*
  Ruta: '/api/medicos'
*/

const { Router } = require('express');
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico
} = require('../controllers/medicos');

const router = Router();

router.get('/', getMedicos);
router.post('/',
  [
  ],
  crearMedico);

router.put('/:id',
  [
  ],
  actualizarMedico);

router.delete('/:id', borrarMedico)

module.exports = router;



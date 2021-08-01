/*
 Ruta: '/api/hospitales'
 */

const { Router } = require('express');
const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital
} = require('../controllers/hospitales');

const router = Router();

router.get('/', getHospitales);
router.post('/',
  [
  ],
  crearHospital);

router.put('/:id',
  [
  ],
  actualizarHospital);

router.delete('/:id', borrarHospital)

module.exports = router;


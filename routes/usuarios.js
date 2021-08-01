/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getUsuarios);
router.post('/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearUsuario);

router.put('/:id',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario);

router.delete('/:id', borrarUsuario)

module.exports = router;

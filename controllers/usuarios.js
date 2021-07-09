const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, 'name email role google');

  res.json({
    ok: true,
    usuarios
  })
}

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const isEmail = await Usuario.findOne({ email });

    if (isEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado'
      });
    }
    const usuario = new Usuario(req.body);

    // Encriptación de la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt)

    // Guardar usuario en la BD
    await usuario.save();

    res.json({
      ok: true,
      usuario,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      msg: 'Hubo un error inesperado',
    });
  }
}

module.exports = {
  getUsuarios,
  crearUsuario
}

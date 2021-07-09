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

const actualizarUsuario = async (req, res = response) => {
  // TODO: Validar token y comprobar si es el ususario correcto
  const uid = req.params.id;

  try {
    const usuarioBD = await Usuario.findById(uid);

    if (!usuarioBD) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un usuario con ese id 🤷🏻‍♂️'
      })
    }

    // Actualizaciones
    const { password, google, email, ...campos } = req.body;

    if (usuarioBD.email !== email) {
      const isEmail = await Usuario.findOne({ email });

      if (isEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un usuario con ese correo',
        })
      }
    }

    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Ocurrió un error inesperado'
    })
  }
}

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario
}

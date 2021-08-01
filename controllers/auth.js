const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    //Verificar email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado'
      })
    }

    //Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña no válida'
      })
    }

    // Generar JWT

    return res.json({
      ok: true,
      msg: 'Hola mundo'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado. Hable con el administrador.'
    })
  }
}

module.exports = { login }

const Usuario = require('../models/usuario');

const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, 'name email role google');

  res.json({
    ok: true,
    usuarios
  })
}

const crearUsuario = async (req, res) => {
  const { email, password, name } = req.body;

  const usuario = new Usuario(req.body)

  await usuario.save();

  res.json({
    ok: true,
    usuario,
  })
}

module.exports = {
  getUsuarios,
  crearUsuario
}

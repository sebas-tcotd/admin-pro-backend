const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const { response } = require("express");

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
    const token = await generateJWT(usuarioDB.id)

    return res.json({
      ok: true,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado. Hable con el administrador.'
    })
  }
}

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;


  try {
    const { name, email, picture } = await googleVerify(googleToken);

    // Se verifica si el usuario que se loguea con Google ya existe en nuestra BD
    const usuarioDB = await Usuario.findOne({ email });
    let usuario;

    if (!usuarioDB) {
      // Si no existe el usuario
      usuario = new Usuario({
        name,
        email,
        password: '',
        img: picture,
        google: true
      });
    } else {
      // Si es que existe el usuario
      // Si se cambiara la contraseña, entonces el usuario estaría obligado
      // a ingresar solo por el login de Google. Para esta situación, se
      // decidió no modificarla para que así pueda ingresar por ambas vías.
      usuario = usuarioDB;
      usuario.google = true;
    }

    // Se guarda en la BD
    await usuario.save();

    // Se genera el JWT
    const token = await generateJWT(usuario.id)

    return res.json({
      ok: true,
      token
    });
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'El token no es correcto.'
    })
  }
}

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  // Se genera el JWT
  const token = await generateJWT(uid);

  // Se obtiene el usuario por su UID
  const user = await Usuario.findById(uid);

  return res.json({
    ok: true,
    token,
    user,
  });
}

module.exports = { login, googleSignIn, renewToken }

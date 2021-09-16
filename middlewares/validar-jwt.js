const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = (req, res, next) => {
  // Leer el token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición.",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token inválido.",
    });
  }
};

const validateAdminRole = async (req, res, next) => {
  const uid = req.uid;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario no existe.",
      });
    }

    if (usuarioDB.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        msg: "Usted no tiene privilegios para realizar esto.",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error. Contacte con el administrador",
    });
  }
};

const validateAdminRoleOrSameUser = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario no existe.",
      });
    }

    if (usuarioDB.role === "ADMIN_ROLE" || uid === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "Usted no tiene privilegios para realizar esto.",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error. Contacte con el administrador",
    });
  }
};

module.exports = { validarJWT, validateAdminRole, validateAdminRoleOrSameUser };

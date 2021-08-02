const { response } = require("express");
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

// getTodo
const getTodo = async (req, res = response) => {
  const term = req.params.term;
  const regex = new RegExp(term, 'i');

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ name: regex }),
    Medico.find({ name: regex }),
    Hospital.find({ name: regex }),
  ]);

  return res.json({
    ok: true,
    msg: 'Búsqueda total.',
    usuarios,
    medicos,
    hospitales,
  });
}

const getDocumentosColeccion = async (req, res = response) => {
  const table = req.params.table;
  const term = req.params.term;
  const regex = new RegExp(term, 'i');

  let data = [];

  switch (table) {
    case 'medicos':
      data = await Medico.find({ name: regex })
        .populate('usuario', 'name img')
        .populate('hospital', 'name img');
      break;

    case 'usuarios':
      data = await Usuario.find({ name: regex })
      break;

    case 'hospitales':
      data = await Hospital.find({ name: regex })
        .populate('usuario', 'name img');
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser 'usuarios', 'medicos' u 'hospitales'."
      });


  }

  res.json({
    ok: true,
    resultados: data,
  });
}

module.exports = {
  getTodo,
  getDocumentosColeccion,
}

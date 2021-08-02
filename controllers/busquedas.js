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

module.exports = {
  getTodo
}

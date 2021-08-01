const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'getHospitales'
  })
}

const crearHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body
  });

  try {
    const hospitalDB = await hospital.save();

    return res.status(201).json({
      ok: true,
      msg: 'Hospital creado con éxito.',
      hospital: hospitalDB,
    })

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Ocurrió un error inesperado. Hable con el administrador.'
    })
  }

  return res.json({
    ok: true,
    msg: 'crear Hospitales'
  })
}

const actualizarHospital = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'put Hospitales'
  })
}

const borrarHospital = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'delete Hospitales'
  })
}

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital
}

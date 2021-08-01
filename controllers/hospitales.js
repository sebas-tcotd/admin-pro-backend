const { response } = require('express')

const getHospitales = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'getHospitales'
  })
}

const crearHospital = (req, res = response) => {
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

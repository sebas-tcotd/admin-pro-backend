const { response } = require('express')

const getMedicos = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'get Médicos'
  })
}

const crearMedico = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'crear Médico'
  })
}

const actualizarMedico = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'put Médico'
  })
}

const borrarMedico = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'delete Médico'
  })
}

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico
}

const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find().populate('usuario', 'name img');
  return res.json({
    ok: true,
    hospitales
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
}

const actualizarHospital = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se pudo encontrar el id del hospital.'
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    }

    const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

    return res.json({
      ok: true,
      msg: 'Hospital actualizado.',
      hospital: hospitalActualizado,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Ocurrió un error inesperado. Hable con el administrador.',
    })
  }

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

const { response } = require('express')

const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate('hospital', 'name')
    .populate('usuario', 'name');

  return res.json({
    ok: true,
    medicos,
  });
}

const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body
  });

  try {
    const medicoDB = await medico.save();

    return res.status(201).json({
      ok: true,
      medico: medicoDB
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Ocurrió un error con el servidor. Hable con el administrador.'
    })
  }
}

const actualizarMedico = async (req, res = response) => {
  const id = req.params.id;

  try {
    const medicoDB = await Medico.findById(id);

    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se pudo encontrar el id del médico.'
      });
    }

    const cambiosMedico = {
      ...req.body,
    }

    const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

    return res.json({
      ok: true,
      msg: 'Médico actualizado.',
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Ocurrió un error inesperado. Hable con el administrador.',
    })
  }
}

const borrarMedico = async (req, res = response) => {
  const id = req.params.id;

  try {
    const medicoDB = await Medico.findById(id);

    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se pudo encontrar el id del médico.'
      });
    }

    await Medico.findByIdAndDelete(id);

    return res.json({
      ok: true,
      msg: 'Médico eliminado.',
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      msg: 'Ocurrió un error inesperado. Hable con el administrador.',
    });
  }
}

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico
}

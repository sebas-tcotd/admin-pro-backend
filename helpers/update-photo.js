const fs = require('fs');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

const eraseImage = (path) => {
  if (fs.existsSync(path)) {
    // Se borra la imagen anterior
    fs.unlinkSync(path);
  }
}

const updateImage = async (type, id, fileName) => {
  let oldPath = '';
  switch (type) {

    case 'medicos':
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log('No se encontró el ID del médico.');
        return false;
      }

      oldPath = `./uploads/medicos/${medico.img}`;
      eraseImage(oldPath);

      medico.img = fileName;
      await medico.save();
      return true;
      break;
    case 'hospitales':
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log('No se encontró el ID del hospital.');
        return false;
      }

      oldPath = `./uploads/hospitales/${hospital.img}`;
      eraseImage(oldPath);

      hospital.img = fileName;
      await hospital.save();
      return true;
      break;
    case 'usuarios':
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log('No se encontró el ID del usuario.');
        return false;
      }

      oldPath = `./uploads/usuarios/${usuario.img}`;
      eraseImage(oldPath);

      usuario.img = fileName;
      await usuario.save();
      return true;
      break;
  }
}

module.exports = { updateImage };

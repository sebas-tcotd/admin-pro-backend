const { response, json } = require("express");
const { v4: uuidv4 } = require('uuid');

const fileUpload = (req, res = response) => {
  const type = req.params.tipo;
  const id = req.params.id;

  // Validar tipo
  const tiposValidos = ['hospitales', 'medicos', 'usuarios']

  if (!tiposValidos.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: "El tipo de dato no es 'medicos', 'usuarios' u 'hospitales'."
    });
  }

  // Se valida que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No hay ningún archivo.',
    });
  }

  // Se procesa el archivo (imagen)
  const file = req.files.image;
  const splitName = file.name.split('.');
  const fileExtension = splitName[splitName.length - 1];

  // Se valida la extensión del archivo
  const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
  if (!validExtensions.includes(fileExtension)) {
    return res.status(400).json({
      ok: false,
      msg: 'La extensión del archivo no es válida.',
    });
  }

  // Se genera el nombre del archivo
  const fileName = `${uuidv4()}.${fileExtension}`;

  // Se establece la ruta (path) para guardar la imagen
  const path = `./uploads/${type}/${fileName}`;

  // Se mueve la imagen al servidor
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'Ocurrió un error al mover la imagen.'
      });
    }

    return res.json({
      ok: true,
      msg: 'Archivo subido exitosamente.',
      fileName
    });
  });
}

module.exports = { fileUpload };

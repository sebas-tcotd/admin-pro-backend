const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  hospital: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Hospital'
  }
});

MedicoSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  return object;
});

// Por defecto, Mongoose pone en plural
module.exports = model('Medico', MedicoSchema);

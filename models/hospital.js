const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
}, { collection: 'hospitales' });

HospitalSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
})

// Por defecto, Mongoose pone en plural
module.exports = model('Hospital', HospitalSchema);

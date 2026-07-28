const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true // Elimina espacios en blanco al inicio y al final
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true // Convierte el email a minúsculas
    
  },
  mensaje: {
    type: String,
    required: true,
    trim: true // Elimina espacios en blanco al inicio y al final
  },
  fecha: {
        type: Date,
        default: Date.now // Se guarda la fecha y hora exacta automáticamente
    }
});

module.exports = mongoose.model('Contacto', contactoSchema);
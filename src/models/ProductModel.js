const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  color: {type: String},
  talla: {tipy: String},
  descripcion: { type: String },
  categoria: { type: String },
  stock: { type: Number}
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);

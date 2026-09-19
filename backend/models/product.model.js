const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);

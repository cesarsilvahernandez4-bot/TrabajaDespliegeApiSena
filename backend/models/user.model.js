const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

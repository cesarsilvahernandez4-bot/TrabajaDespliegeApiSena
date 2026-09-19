const Product = require('../models/product.model');

const productCtrl = {};

productCtrl.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ status: 'Error al obtener productos', error: error.message });
    }
};

productCtrl.createProduct = async (req, res) => {
    try {
        const product = new Product({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock
        });
        await product.save();
        res.json({ status: 'Producto guardado' });
    } catch (error) {
        res.status(500).json({ status: 'Error al guardar el producto', error: error.message });
    }
};

productCtrl.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ status: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ status: 'Error al obtener el producto', error: error.message });
    }
};

productCtrl.editProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { nombre, descripcion, precio, stock }, { new: true });
        if (!updatedProduct) return res.status(404).json({ status: 'Producto no encontrado' });
        res.json({ status: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ status: 'Error al actualizar el producto', error: error.message });
    }
};

productCtrl.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ status: 'Producto no encontrado' });
        res.json({ status: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ status: 'Error al eliminar el producto', error: error.message });
    }
};

module.exports = productCtrl;

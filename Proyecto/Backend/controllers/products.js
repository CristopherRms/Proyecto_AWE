const { response, request } = require("express");
const { ProductRepository } = require("../repositories/Product");
const { ObjectId } = require('mongoose').Types;
const getAllProducts = async (req = request, res = response) => {
    const { searchTerm } = req.query;

    try {
        const result = await ProductRepository.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "error",
        });
    }
};

const createProduct = async (req = request, res = response) => {
    let { title, price, description, category, tallas, images } = req.body || {};

    // Convierte las cadenas de tallas e images separadas por comas en arrays
    if (typeof tallas === 'string') {
        tallas = tallas.split(',').map(item => item.trim());
    }

    if (typeof images === 'string') {
        images = images.split(',').map(item => item.trim());
    }

    const ProductData = { title, price, description, category, tallas, images };

    console.log(ProductData);

    if (!title || !price || !description || !category) {
        res.status(400).json({
            msg: "Info incompleta",
        });
        return;
    }

    try {
        const savedProduct = await ProductRepository.create(ProductData);
        res.status(201).json(savedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "error al agregar",
        });
    }
};


const getCatProducts = async (req = request, res = response) => {
    const { category } = req.params;  // Capturamos la categoría de los parámetros de la URL
  
    try {
      // Filtramos los productos por la categoría recibida
      const result = await ProductRepository.getCat(category);  
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "error",
      });
    }
  };
  
const getProductById = async (req = request, res = response) => {
    const { id } = req.params;
    console.log(id);
    try {
        const result = await ProductRepository.getById(id);
        if (!result) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "error",
        });
    }
};

// Método para borrar un producto por su ID
const deleteProductById = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const deletedProduct = await ProductRepository.deleteById(id);
        if (!deletedProduct) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }
        res.status(200).json({ msg: "Producto eliminado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al intentar eliminar el producto",
        });
    }
};
const updateProductById = async (req = request, res = response) => {
    const { id } = req.params;
    const { title, price, description, category } = req.body || {};
    
    // Validar que haya al menos un campo para actualizar
    if (!title && !price && !description && !category) {
        return res.status(400).json({
            msg: "Nada que actualizar, envía al menos un campo",
        });
    }

    try {
        // Intentar actualizar el producto
        const updatedProduct = await ProductRepository.updateById(id, {
            title,
            price,
            description,
            category,
        });

        if (!updatedProduct) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }

        res.status(200).json({
            msg: "Producto actualizado correctamente",
            product: updatedProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al intentar actualizar el producto",
        });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    deleteProductById,
    updateProductById,
    getCatProducts
};

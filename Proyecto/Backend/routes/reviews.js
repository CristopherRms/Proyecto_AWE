const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');

// Rutas para las reseñas
router.get('/', reviewsController.getAllReviews); // Obtener todas las reseñas
router.post('/', reviewsController.createReview); // Crear una nueva reseña
router.delete('/:id', reviewsController.deleteReview); // Eliminar una reseña por ID

module.exports = router;

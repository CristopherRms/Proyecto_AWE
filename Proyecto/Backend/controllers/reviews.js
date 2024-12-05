const Review = require('../models/Review');

// Obtener todas las reseñas
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las reseñas', error: err.message });
  }
};

// Crear una nueva reseña
exports.createReview = async (req, res) => {
  try {
    const { user, description, date } = req.body;
    const newReview = new Review({ user, description, date });
    const savedReview = await newReview.save();
    console.log(newReview);
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear la reseña', error: err.message });
  }
};

// Eliminar una reseña por ID
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.status(200).json({ message: 'Reseña eliminada exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la reseña', error: err.message });
  }
};

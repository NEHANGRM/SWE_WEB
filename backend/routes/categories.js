const express = require('express');
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getCategories).post(protect, createCategory);

router
    .route('/:id')
    .get(protect, getCategory)
    .put(protect, updateCategory)
    .delete(protect, deleteCategory);

module.exports = router;

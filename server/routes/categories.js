const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { auth, authorize } = require('../middleware/auth');
const { validateCategory } = require('../middleware/validation');

router.route('/')
  .get(getCategories)
  .post(auth, authorize('admin'), validateCategory, createCategory);

router.route('/:id')
  .get(getCategory)
  .put(auth, authorize('admin'), validateCategory, updateCategory)
  .delete(auth, authorize('admin'), deleteCategory);

module.exports = router;

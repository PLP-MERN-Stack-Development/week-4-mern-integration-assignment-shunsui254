const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
} = require('../controllers/postController');
const { auth, authorize } = require('../middleware/auth');
const { validatePost, validateComment } = require('../middleware/validation');

router.route('/')
  .get(getPosts)
  .post(auth, validatePost, createPost);

router.route('/:id')
  .get(getPost)
  .put(auth, validatePost, updatePost)
  .delete(auth, deletePost);

router.route('/:id/comments')
  .post(auth, validateComment, addComment);

module.exports = router;

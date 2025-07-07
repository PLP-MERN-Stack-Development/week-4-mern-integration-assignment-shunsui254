import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApi, useAsyncMutation } from '../hooks/useApi';
import { postService, categoryService } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const CreateEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    isPublished: false,
  });

  const { data: categoriesData, loading: categoriesLoading } = useApi(
    () => categoryService.getAllCategories(),
    []
  );

  const { data: postData, loading: postLoading, error: postError } = useApi(
    () => isEditing ? postService.getPost(id) : Promise.resolve(null),
    [id, isEditing]
  );

  const { mutate, loading: submitting, error: submitError } = useAsyncMutation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isEditing && postData?.data) {
      const post = postData.data;
      setFormData({
        title: post.title || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        category: post.category?._id || '',
        tags: post.tags ? post.tags.join(', ') : '',
        isPublished: post.isPublished || false,
      });
    }
  }, [isAuthenticated, navigate, isEditing, postData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    try {
      if (isEditing) {
        await mutate(() => postService.updatePost(id, submitData));
      } else {
        await mutate(() => postService.createPost(submitData));
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  if (!isAuthenticated) {
    return <Loading />;
  }

  if (categoriesLoading || (isEditing && postLoading)) {
    return <Loading />;
  }

  if (postError) {
    return <ErrorMessage message={postError} />;
  }

  const categories = categoriesData?.data || [];

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div className="card">
        <h1>{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              className="form-textarea"
              style={{ minHeight: '80px' }}
              placeholder="Brief description of your post..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter tags separated by commas"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="form-textarea"
              style={{ minHeight: '300px' }}
              required
              placeholder="Write your post content here..."
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
              />
              Publish immediately
            </label>
          </div>

          {submitError && <div className="error-message">{submitError}</div>}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting 
                ? (isEditing ? 'Updating...' : 'Creating...') 
                : (isEditing ? 'Update Post' : 'Create Post')
              }
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditPost;

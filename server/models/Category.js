const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      default: '#3B82F6', // Default blue color
    },
  },
  { timestamps: true }
);

// Create slug from name before saving
CategorySchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    return next();
  }
  
  this.slug = this.name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
    
  next();
});

module.exports = mongoose.model('Category', CategorySchema);

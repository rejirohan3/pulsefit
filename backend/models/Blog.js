const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  slug:       { type: String, required: true, unique: true },
  content:    { type: String, required: true },
  excerpt:    { type: String, default: '' },
  coverImage: { type: String, default: '' },
  category:   { type: String, default: 'Fitness' },
  author:     { type: String, default: 'PulseFit Team' },
  published:  { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
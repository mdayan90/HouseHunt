const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['apartment', 'house', 'studio', 'villa', 'condo'], required: true },
  amenities: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  approved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);

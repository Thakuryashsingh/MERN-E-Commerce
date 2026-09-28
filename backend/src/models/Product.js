import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0, validate: Number.isInteger },
  category: { type: String, required: true, trim: true, maxlength: 80 },
  image: { type: String, trim: true, default: '' }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);

import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  url: { type: String, required: true, trim: true, maxlength: 2048 },
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  upvotes: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

export default mongoose.models.Resource || mongoose.model('Resource', ResourceSchema);

import mongoose, { Types } from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  expirationdate: {
    type: Date,
    required: true,
  },
  author: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
  cafe: {
    type: Schema.Types.ObjectId,
    ref: 'Cafe',
  },
});

export default model('Post', postSchema);

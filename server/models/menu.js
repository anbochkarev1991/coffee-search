import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const menuSchema = new Schema({
  goods: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
  },
  location: {
    type: mongoose.ObjectId,
    ref: 'Cafe',
  },
});

export default model('Menu', menuSchema);

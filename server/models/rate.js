import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const rateSchema = new Schema({
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  author: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
});

export default model('Rate', rateSchema);

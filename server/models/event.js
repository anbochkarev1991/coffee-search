import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: mongoose.ObjectId,
    ref: 'Cafe',
  },
  author: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
});

export default model('Event', eventSchema);

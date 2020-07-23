import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const baristaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  photo: {
    type: String,
  },
  location: {
    type: mongoose.ObjectId,
    ref: 'Cafe',
  },
});

export default model('Barista', baristaSchema);

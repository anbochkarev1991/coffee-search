import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const batchSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  region: {
    type: String,
  },
  roaster: {
    type: String,
  },
  cultivation: {
    type: String,
  },
  location: {
    type: mongoose.ObjectId,
    ref: 'Cafe',
  },
});

export default model('Batch', batchSchema);

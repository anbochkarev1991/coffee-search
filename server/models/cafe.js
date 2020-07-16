import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const cafeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  info: {
    type: Object,
  },
});

export default model('Cafe', cafeSchema);

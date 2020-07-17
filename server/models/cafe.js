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
  latitude: {
    required: true,
    type: Number,
  },
  longitude: {
    required: true,
    type: Number,
  },
  rating: {
    type: Number,
  },
  info: {
    type: Object,
  },
});

export default model('Cafe', cafeSchema);

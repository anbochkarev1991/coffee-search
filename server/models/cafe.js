import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const cafeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  latitude: {
    required: true,
    type: Number,
  },
  longitude: {
    required: true,
    type: Number,
  },
  address: {
    type: String,
    required: true,
  },
  rating: [{ type: Schema.Types.ObjectId, ref: 'Rate' }],
  info: {
    type: Object,
  },
});

export default model('Cafe', cafeSchema);

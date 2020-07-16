import mongoose, { Date } from 'mongoose';

const { Schema, model } = mongoose;

const commentSchema = new Schema({
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
  },
  author: {
    type: mongoose.ObjectId,
    ref: User,
  },
  response: {
    type: String,
  },
  cafe: {
    type: mongoose.ObjectId,
    ref: Cafe,
  },
});

export default model('Comment', commentSchema);

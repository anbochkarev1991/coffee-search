import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
  },
});

export default model('User', userSchema);

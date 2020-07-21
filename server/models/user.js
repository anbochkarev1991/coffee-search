import mongoose from 'mongoose';
import validator from 'validator';

const { isEmail } = validator;
const { model, Schema } = mongoose;

const userSchema = new Schema({
  login: {
    trim: true,
    type: String,
    required: 'Login is required',
    unique: true,
    minlength: 3,
    maxlength: 15,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [isEmail, 'Invalid email format'],
  },
  password: {
    type: String,
    required: 'Password is required',
    minlength: 6,
  },
  registered: {
    type: Date,
    default: Date.now,
  },
  birthday: {
    type: Date,
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Cafe' }],
  subscriptions: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  sex: {
    type: String,
  },
});

export default model('User', userSchema);

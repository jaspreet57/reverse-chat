import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  online: { type: Boolean, default: false },
  lastActive: Date,
});

UserSchema.pre('save', async function save(next) {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

UserSchema.set('toJSON', {
  transform(doc, user) {
    // eslint-disable-next-line no-param-reassign
    delete user.password;
    return user;
  },
});

UserSchema.methods.isValidPassword = async function isValidPassword(password) {
  const user = this;
  if (user.password && password) {
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }
  return false;
};

const UserModel = mongoose.model('Users', UserSchema);

export default UserModel;

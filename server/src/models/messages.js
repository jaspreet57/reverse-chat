import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const MessageSchema = new Schema(
  {
    text: String,
    sender: { type: ObjectId, ref: 'Users' },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

const MessagesModel = mongoose.model('Messages', MessageSchema);

export default MessagesModel;

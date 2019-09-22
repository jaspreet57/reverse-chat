import mongoose from 'mongoose';
import Messages from '../../models/messages';
import eventNames from '../event-names';
import { reverseMessage } from '../services';

const { messageEvent } = eventNames;

const handleMessage = (socket) => async ({ text }) => {
  const senderId = socket.store.user._id;
  const messageData = {
    text,
    sender: mongoose.Types.ObjectId(senderId),
  };

  const savedMessage = await new Messages(messageData).save();

  socket.nsp.emit(messageEvent, savedMessage);

  const reversedMessage = await reverseMessage(text);

  socket.nsp.emit(messageEvent, reversedMessage);
};

export default handleMessage;

import mongoose from 'mongoose';

import Messages from '../../models/messages';
import Users from '../../models/users';

const systemBot = {};

const reverseMessage = async (text) => {
  if (!systemBot.id) {
    const systemUser = await Users.findOne({ email: 'system.bot' });
    if (systemUser) {
      systemBot.id = systemUser._id;
    } else {
      throw new Error('System User is not defined in database.');
    }
  }
  const reverseText = String(text).split('').reverse().join('');
  const messageData = {
    text: reverseText,
    sender: mongoose.Types.ObjectId(systemBot.id),
  };

  return new Messages(messageData).save();
};

export default reverseMessage;

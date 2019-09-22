import Messages from '../models/messages';

const getMessages = async (req, res) => {
  const messages = await Messages.find();
  return res.send(messages);
};

const getMessageCountByUser = async (req, res) => {
  const result = await Messages.aggregate([{ $group: { _id: '$sender', count: { $sum: 1 } } }]);
  return res.send(result);
};

export { getMessages, getMessageCountByUser };

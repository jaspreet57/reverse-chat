import Users from '../models/users';

const getUsers = async (req, res) => {
  const users = await Users.find();
  return res.send(users);
};

const getUser = async (req, res) => {
  const user = await Users.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(404).send('User not found');
  }
  return res.send(user);
};

export {
  getUsers,
  getUser,
};

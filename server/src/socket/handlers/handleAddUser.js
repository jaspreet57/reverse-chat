import eventNames from '../event-names';
import Users from '../../models/users';

const { exceptionEvent } = eventNames;
const createException = (socket) => (message) => socket.emit(exceptionEvent, { message });

const handleAddUser = (socket) => async (userDetails) => {
  const { _id } = userDetails;
  const exception = createException(socket);

  if (!_id || typeof _id !== 'string') {
    return exception('User Id is required.');
  }

  const user = await Users.findById(_id);

  if (!user) {
    return exception('User not found.');
  }

  return Object.assign(socket, { store: { user } });
};

export default handleAddUser;

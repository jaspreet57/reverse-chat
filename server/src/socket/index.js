import { io } from '../setup';
import eventNames from './event-names';
import {
  handleMessage,
  handleAddUser,
} from './handlers';

const { messageEvent, addUserEvent } = eventNames;

const handleConnection = (socket) => {
  socket.on(addUserEvent, handleAddUser(socket));
  socket.on(messageEvent, handleMessage(socket));
};

io.on('connection', handleConnection);

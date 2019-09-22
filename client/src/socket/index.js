import io from 'socket.io-client';
import { toast } from 'react-toastify';
import eventNames from './event-names';
import {
  sendAddUserEvent,
  sendMessageEvent,
} from './emit';
import { serverConfig } from '../config';


const {
  messageEvent,
  exceptionEvent,
} = eventNames;

const initSocket = ({
  user,
  newMessage,
}) => {
  const client = io.connect(serverConfig.SERVER_BASE_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    transports: ['websocket'],
  });

  client.on('connect', () => {
    sendAddUserEvent(client)(user);
  });

  client.on(messageEvent, (message) => {
    newMessage(message);
  });

  client.on(exceptionEvent, ({ message }) => {
    toast.error(message);
  });

  const close = () => {
    client.removeAllListeners();
    client.close();
  };

  return {
    sendMessage: sendMessageEvent(client),
    close,
  };
};

export default initSocket;

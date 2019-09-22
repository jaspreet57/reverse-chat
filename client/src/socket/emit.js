import eventNames from './event-names';

const { addUserEvent, messageEvent } = eventNames;

const sendAddUserEvent = (client) => (user) => client.emit(addUserEvent, user);

const sendMessageEvent = (client) => (message) => {
  client.emit(messageEvent, message);
};

export { sendMessageEvent, sendAddUserEvent };

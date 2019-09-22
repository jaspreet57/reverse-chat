import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../AppContext';
import ChatInputBox from '../ChatInputBox';
import Message from '../Message';
import { ChatBox, ChatHistory } from './style';

const ChatRoom = ({ activeKey }) => {
  const { allUsersMap, messages } = useAppContext();
  const lastItemRef = useRef(null);

  if (activeKey === 'chatroom') {
    setTimeout(() => {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }

  useEffect(() => {
    lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div style={{ minHeight: 350 }}>
      <ChatBox>
        <ChatHistory>
          <div>
            {messages.map((message) => (
              <Message key={message._id} message={message} user={allUsersMap[message.sender]} />
            ))}
            <div ref={lastItemRef} />
          </div>
        </ChatHistory>
        <ChatInputBox />
      </ChatBox>
    </div>
  );
};

ChatRoom.propTypes = {
  activeKey: PropTypes.string.isRequired,
};

export default ChatRoom;

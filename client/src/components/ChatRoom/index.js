import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../AppContext';
import ChatInputBox from '../ChatInputBox';
import Message from '../Message';
import { ChatBox, ChatHistory } from './style';

const ChatRoom = () => {
  const { allUsersMap, messages } = useAppContext();
  const lastItemRef = useRef(null);

  useEffect(() => {
    lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div style={{ minHeight: 280 }}>
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

export default ChatRoom;

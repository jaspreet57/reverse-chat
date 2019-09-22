import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../AppContext';
import ChatInputBox from '../ChatInputBox';
import Message from '../Message';
import { ChatBox, ChatHistory } from './style';

const ChatRoom = () => {
  const { allUsersMap } = useAppContext();
  const lastItemRef = useRef(null);
  const messages = [
    {
      _id: '1',
      text: 'something one',
      sender: '5d85e3aaa52b17189b1a287b',
    },
    {
      _id: '2',
      text: 'something two',
      sender: '5d85a0b6a8b0d00bef54cfb6',
    },
  ];

  useEffect(() => {
    lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div>
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

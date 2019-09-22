import React, { useState } from 'react';
import styled from 'styled-components';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useAppContext } from '../../AppContext';

const InputContainer = styled.div`
  margin: 0;
`;
const ChatInputBox = () => {
  const { sendMessage } = useAppContext();
  const [input, setInput] = useState('');
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const sendIt = () => {
    setInput('');
    return sendMessage(input);
  };

  const keyPressed = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      return sendIt();
    }
    return true;
  };

  return (
    <InputContainer>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Write your message"
          aria-label="Write your message"
          aria-describedby="message-input-box"
          value={input}
          onChange={onInputChange}
          onKeyPress={keyPressed}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={sendIt}>
            Go !
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </InputContainer>
  );
};

export default ChatInputBox;

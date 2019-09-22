import React from 'react';
import PropTypes from 'prop-types';
import MessageContainer from './style';

const Message = (props) => {
  const { message, user } = props;

  return (
    <MessageContainer>
      <h4>{user.name || user.email}</h4>
      <p>{message.text}</p>
    </MessageContainer>
  );
};

Message.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
};

Message.defaultProps = {
  user: {
    name: '',
    email: '',
  },
};

export default Message;

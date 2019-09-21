import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SignupForm = (props) => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      props.handleFormSubmit({
        email,
        password,
      });
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          required
          placeholder="you@somewhere.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please enter your password.</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Signup
      </Button>
      <br />
      <br />
    </Form>
  );
};

SignupForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};

export default SignupForm;

/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Jumbotron } from 'react-bootstrap';
import useApi from '../../custom-hooks/use-api';
import { signupUser } from '../../API';
import SignupForm from '../../components/SignupForm';

const SignupPage = () => {
  const [data, loadData, loading] = useApi(signupUser, null);

  const handleFormSubmit = (formData) => {
    loadData(formData);
  };

  return (
    <Container className="p-3">
      <Jumbotron>
        <h1>Signup</h1>
        {loading ? <div>loading...</div> : null}
        {data && data.data && data.data.user && data.data.user._id ? (
          <>
            <div>Signed up Successfully</div>
            <Link to="/">Go to Login</Link>
          </>
        ) : (
          <>
            <SignupForm handleFormSubmit={handleFormSubmit} />
            OR{' '}
            <Link to="/">Go back to Login</Link>
          </>
        )}
      </Jumbotron>
    </Container>
  );
};

export default SignupPage;

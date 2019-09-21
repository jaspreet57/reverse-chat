/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Jumbotron } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';
import LoginForm from '../../components/LoginForm';
import { useAppContext } from '../../AppContext';
import useApi from '../../custom-hooks/use-api';
import { authenticateUser } from '../../API';
import { authClients } from '../../config';

const openErrorAlert = (error) => {
  toast.error((error && error.message) || 'User not found!');
};

const LoginPage = () => {
  const { user, setUser } = useAppContext();
  const [data, loadData, loading] = useApi(authenticateUser, null);

  const handleFormSubmit = (formData) => {
    loadData('basic', formData);
  };

  const handleGoogleLogin = (response) => {
    const { tokenId } = response;
    loadData('google', { tokenId });
  };

  useEffect(() => {
    if (data && data.data) {
      if (data.data.user && data.data.user._id) {
        setUser(data.data.user);
      } else {
        openErrorAlert();
      }
    }
  }, [data, setUser]);

  if (user && user._id) {
    return <Redirect to="/home" />;
  }

  return (
    <Container className="p-3">
      <Jumbotron>
        {loading ? (
          <div>...loading</div>
        ) : (
          <div>
            <div style={{ display: 'block' }}>
              <GoogleLogin
                clientId={authClients.GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={handleGoogleLogin}
                onFailure={openErrorAlert}
                width={200}
                theme="dark"
              />
            </div>
            <br />
            <h3> OR Login the old fashioned way :)</h3>
            <LoginForm handleFormSubmit={handleFormSubmit} />
          </div>
        )}
      </Jumbotron>
    </Container>
  );
};

export default LoginPage;

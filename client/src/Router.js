import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './views/Home';
import LoginPage from './views/LoginPage';
import SignupPage from './views/SignupPage';

const Router = () => (
  <BrowserRouter>
    <Route exact path="/" component={LoginPage} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/signup" component={SignupPage} />
  </BrowserRouter>
);

export default Router;

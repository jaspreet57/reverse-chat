import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import { useAppContext } from './AppContext';
import Router from './Router';
import Header from './components/Header';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

toast.configure();

function App() {
  return (
    <useAppContext.Provider>
      <Container className="p-3">
        <Header />
        <Router />
      </Container>
      <ToastContainer />
    </useAppContext.Provider>
  );
}

export default App;

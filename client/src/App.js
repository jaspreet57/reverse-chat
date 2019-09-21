import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAppContext } from './AppContext';
import Router from './Router';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

toast.configure();

function App() {
  return (
    <useAppContext.Provider>
      <Router />
      <ToastContainer />
    </useAppContext.Provider>
  );
}

export default App;

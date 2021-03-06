import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Navbar, Button, Tabs, Tab,
} from 'react-bootstrap';
import { useAppContext } from '../../AppContext';
import Dashboard from '../../components/Dashboard';
import ChatRoom from '../../components/ChatRoom';
import SpinnerContainer from '../../components/SpinnerContainer';

function Home() {
  const {
    user, allUserIds, fetchUsers, logoutUser,
  } = useAppContext();
  const [key, setKey] = useState('dashboard');

  useEffect(() => {
    if (user && user.email) {
      fetchUsers(user);
    }
  }, [user, fetchUsers]);

  if (!user || !user.email) {
    return <Redirect to="/" push />;
  }

  if (!allUserIds.length) {
    return <div style={{ height: '100vh', width: '100vw' }}><SpinnerContainer /></div>;
  }

  return (
    <div className="home">
      <Navbar className="bg-light justify-content-between">
        <Navbar.Brand>Hi {user.name || user.email}</Navbar.Brand>
        <Button type="button" onClick={logoutUser}>
          Logout
        </Button>
      </Navbar>
      <br />
      <br />
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="home-tabs">
        <Tab eventKey="dashboard" title="Dashboard">
          <Dashboard />
        </Tab>
        <Tab eventKey="chatroom" title="Char Room">
          <ChatRoom activeKey={key} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Home;

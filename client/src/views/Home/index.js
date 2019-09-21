import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppContext } from '../../AppContext';

function Home() {
  const {
    user, allUserIds, fetchUsers, logoutUser,
  } = useAppContext();

  useEffect(() => {
    if (user && user.email) {
      fetchUsers(user);
    }
  }, [user, fetchUsers]);

  if (!user || !user.email) {
    return <Redirect to="/" push />;
  }

  if (!allUserIds.length) {
    return <div style={{ height: '100vh', width: '100vw' }}>...loading</div>;
  }

  return (
    <div className="home">
      You are at home page now.
      <button type="button" onClick={logoutUser}>Logout</button>
    </div>
  );
}

export default Home;

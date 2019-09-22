/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Table } from 'react-bootstrap';
import { useAppContext } from '../../AppContext';

const Dashboard = () => {
  const { allUserIds, allUsersMap } = useAppContext();
  const userIdsWithoutSystemBot = allUserIds.filter(
    (userId) => allUsersMap[userId].email !== 'system.bot',
  );
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Message Count</th>
        </tr>
      </thead>
      <tbody>
        {userIdsWithoutSystemBot.map((userId, idx) => (
          <tr key={userId}>
            <td>{idx + 1}</td>
            <td>{allUsersMap[userId].name || allUsersMap[userId].email}</td>
            <td>{allUsersMap[userId].messageCount || '0'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Dashboard;

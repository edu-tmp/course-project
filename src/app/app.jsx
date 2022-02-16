import React, { useState, useEffect } from 'react';
import Users from './components/users';
import api from './api/api';

export default function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((usrs) => {
      setUsers(usrs);
    });
  }, []);

  function handleDelete(userId) {
    return setUsers(
      users.filter((user) => {
        return user._id !== userId;
      })
    );
  }

  function handleToggleBookmark(userId) {
    return setUsers(
      users.map((user) => {
        if (user._id === userId) user.bookmark = !user.bookmark;
        return user;
      })
    );
  }

  return <div>{users && <Users users={users} onDelete={handleDelete} onToggle={handleToggleBookmark} />}</div>;
}

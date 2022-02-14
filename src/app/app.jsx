import React, { useState } from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from './api/api'

export default function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  function handleDelete(userId) {
    return setUsers(users.filter(user => { return user._id !== userId }));
  }

  function handleToggleBookmark(userId) {
    return setUsers(users.map(user => { if (user._id === userId) user.bookmark = !user.bookmark; return user; }));
  }

  return (
    <div>
      <SearchStatus count={users.length} />
      <Users users={users} onDelete={handleDelete} onToggle={handleToggleBookmark} />
    </div>
  )
}
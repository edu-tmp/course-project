import React from 'react';
import User from './user';

export default function Users({ users, onDelete, onToggle}) {
  return (users.length > 0 ? (
    <table className='table'>
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встреч</th>
          <th scope="col">Оценка</th>
          <th scope="col">Bookmark</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return <User onToggle={onToggle} user={user} onDelete={onDelete} />
        })}
      </tbody>
    </table>
  ) : <></>)

}
import React, { useState } from 'react';
import api from '../api/api';

export default function Users() {
  //api.users.fetchAll();
  const [users, setUsers] = useState(api.users.fetchAll());
  function handleDelete(userId) {
    return setUsers(users.filter(user => { return user._id !== userId }));
  }
  function renderUsers() {
    return users.length > 0 ? (
      <table className='table'>
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встреч</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (<tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.qualities.map(quality => { return <span className={'badge m-1 bg-' + quality.color}>{quality.name}</span> })}</td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate + '/5'}</td>
              <td>
                <button type='button' className='btn bg-danger' onClick={() => handleDelete(user._id)}>Remove</button>
              </td>
            </tr>)
          })}
        </tbody>
      </table>
    ) : <></>
  }
  function willWeHaveAParty() {
    const comparator = users.length > 20 ? users.length - Math.trunc(users.length / 10) : users.length;
    return users.length > 0 ?
      <div className='badge m-1 bg-primary'>{users.length + (comparator === 1 ? ' человек может ' : comparator > 4 || comparator === 0  ? ' человек могут ' :' человека могут ' )} с Вами встретиться</div>
      : <div className='badge m-1 bg-danger'>Одно из представлений одиночества:</div>
  }
  return (
    <>
      {willWeHaveAParty()}
      {renderUsers()}
    </>
  )
}
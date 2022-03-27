import React from 'react';
import { useParams } from 'react-router-dom';
import UsersList from '../components/page/usersListPage';
import User from '../components/page/userPage';
import EditUser from '../components/page/editUserPage';

export default function Users() {
  const params = useParams();
  const { userId, edit } = params;
  return <>{userId ? edit ? <EditUser /> : <User userId={userId} /> : <UsersList />}</>;
}

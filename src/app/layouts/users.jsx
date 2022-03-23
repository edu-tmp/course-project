import React from 'react';
import { useParams } from 'react-router-dom';
import UsersList from '../components/usersList';
import User from '../components/user';

export default function Users() {
  const params = useParams();
  const { userId } = params;
  return <>{userId ? <User userId={userId} /> : <UsersList />}</>;
}

import React from 'react';
import { Link } from 'react-router-dom';

const routes = [
  { name: 'Main', link: '/' },
  { name: 'Login', link: '/login' },
  { name: 'Users', link: '/users' },
];

export default function NavBar() {
  return routes.map((route, index) => {
    return (
      <Link key={index} to={route.link}>
        {route.name}
      </Link>
    );
  });
}

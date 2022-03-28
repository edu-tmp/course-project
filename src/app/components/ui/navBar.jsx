import React from 'react';
import { Link } from 'react-router-dom';

const routes = [
  { name: 'Main', link: '/' },
  { name: 'Login', link: '/login' },
  { name: 'Users', link: '/users' },
];

export default function NavBar() {
  return (
    <ul className="nav">
      {routes.map((route, index) => {
        return (
          <li className="nav-item" key={index}>
            <Link className="nav-link" aria-current="page" to={route.link}>
              {route.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

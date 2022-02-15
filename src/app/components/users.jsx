import React, { useState } from 'react';
import PropTypes from 'prop-types';
import User from './user';
import Pagination from './pagination';

import paginate from '../utils/paginate';

export default function Users({ users, onDelete, onToggle }) {
  const [curPage, setCurPage] = useState(1);

  const pageSize = 7;

  function handlePageChange(page) {
    setCurPage(page);
  }

  return (
    <>
      <table className="table">
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
          {paginate(users, curPage, pageSize).map((user) => {
            return (
              <User
                key={user._id}
                onToggle={onToggle}
                user={user}
                onDelete={onDelete}
              />
            );
          })}
        </tbody>
      </table>
      <Pagination
        itemsCount={users.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        curPage={curPage}
      />
    </>
  );
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

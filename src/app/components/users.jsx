import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import User from './user';
import SearchStatus from './searchStatus';
import api from '../api/api';
import Pagination from './pagination';
import GroupList from './groupList';

import paginate from '../utils/paginate';

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default function Users({ users, onDelete, onToggle }) {
  const pageSize = 7;
  const [curPage, setCurPage] = useState(1);

  function handlePageChange(page) {
    setCurPage(page);
  }

  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  useEffect(() => {
    api.professions.fetchAll().then((profs) => setProfessions(profs));
  }, []);
  useEffect(() => {
    const lastPage = Math.ceil(filteredUsers.length / pageSize);
    curPage > lastPage && setCurPage(lastPage);
  }, [users]);
  function handleProfessionSelect(selectedItem) {
    setCurPage(1);
    setSelectedProf(selectedItem);
  }
  function clearFilter() {
    setSelectedProf();
  }

  const filteredUsers = selectedProf
    ? users.filter((user) => {
        return user.profession._id === selectedProf._id;
      })
    : users;

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList items={professions} onItemSelect={handleProfessionSelect} selectedItem={selectedProf} />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Clear filter
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus count={filteredUsers.length} />
        {users.length > 0 && (
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
              {paginate(filteredUsers, curPage, pageSize).map((user) => {
                return <User key={user._id} onToggle={onToggle} user={user} onDelete={onDelete} />;
              })}
            </tbody>
          </table>
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={filteredUsers.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            curPage={curPage}
          />
        </div>
      </div>
    </div>
  );
}

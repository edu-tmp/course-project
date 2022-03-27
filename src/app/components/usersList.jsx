import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import UsersTable from './usersTable';
import SearchStatus from './searchStatus';
import api from '../api/api';
import Pagination from './pagination';
import GroupList from './groupList';
import paginate from '../utils/paginate';

export default function Users() {
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

  const pageSize = 7;
  const [curPage, setCurPage] = useState(1);

  function handlePageChange(page) {
    setCurPage(page);
  }

  const [professions, setProfessions] = useState();

  const [selectedProf, setSelectedProf] = useState();

  const [searchQuery, setSearchQuery] = useState('');

  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });

  useEffect(() => {
    api.professions.fetchAll().then((profs) => setProfessions(profs));
  }, []);

  function handleProfessionSelect(selectedItem) {
    setCurPage(1);
    if (searchQuery !== '') setSearchQuery('');
    setSelectedProf(selectedItem);
  }

  function clearFilter() {
    setSelectedProf();
  }

  function handleSort(item) {
    setSortBy(item);
  }

  function handleSearchQuery({ target }) {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  }
  if (users) {
    const filteredUsers = searchQuery
      ? users.filter((user) => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
      : selectedProf
      ? users.filter((user) => {
          return user.profession._id === selectedProf._id;
        })
      : users;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
    const cropUsers = paginate(sortedUsers, curPage, pageSize);

    const lastPage = Math.ceil(filteredUsers.length / pageSize);
    curPage > lastPage && setCurPage(lastPage);

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
          <input
            type="text"
            name="searchQuery"
            placeholder="Search..."
            onChange={handleSearchQuery}
            value={searchQuery}
          />
          {users.length > 0 && (
            <UsersTable
              users={cropUsers}
              onSort={handleSort}
              curSort={sortBy}
              onDelete={handleDelete}
              onToggle={handleToggleBookmark}
            />
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
  return 'Loading...';
}

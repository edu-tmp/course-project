import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Bookmark from './bookmark';
import Qualities from './qualities';
import Table from './table';
// import user from './user';

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  curSort: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default function UsersTable({ users, onSort, curSort, onToggle, onDelete, ...rest }) {
  const columns = {
    name: { iter: 'name', name: 'Имя', component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link> },
    qualities: { name: 'Качества', component: (user) => <Qualities qualities={user.qualities} /> },
    profession: { iter: 'profession.name', name: 'Профессия' },
    completedMeetings: { iter: 'completedMeetings', name: 'Встреч' },
    rate: { iter: 'rate', name: 'Оценка' },
    bookmark: {
      iter: 'bookmark',
      name: 'Bookmark',
      component: (user) => <Bookmark bookmark={user.bookmark} onToggle={onToggle} userId={user._id} />,
    },
    delete: {
      component: (user) => (
        <button type="button" className="btn bg-danger" onClick={() => onDelete(user._id)}>
          Remove
        </button>
      ),
    },
  };

  return <Table {...{ onSort, curSort, columns, data: users, idProp: '_id', ...rest }} />;
}

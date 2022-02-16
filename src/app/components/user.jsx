import React from 'react';
import PropTypes from 'prop-types';
import Qualities from './qualities';
import Bookmark from './bookmark';

export default function User({ onToggle, onDelete, user }) {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        <Qualities {...user} />
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate + '/5'}</td>
      <td>
        <Bookmark bookmark={user.bookmark} onToggle={onToggle} userId={user._id} />
      </td>
      <td>
        <button type="button" className="btn bg-danger" onClick={() => onDelete(user._id)}>
          Remove
        </button>
      </td>
    </tr>
  );
}

User.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import QualitiesList from '../../ui/qualities';
import { useHistory } from 'react-router-dom';

User.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default function User({ userId }) {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  function handleClick() {
    history.push(history.location.pathname + "/edit");
  }
  if (user) {
    return (
      <div>
        <h1> {user.name}</h1>
        <h2>Profession: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button onClick={handleClick}>Edit</button>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

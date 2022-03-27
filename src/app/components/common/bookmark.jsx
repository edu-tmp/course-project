import React from 'react';
import PropTypes from 'prop-types';

Bookmark.propTypes = {
  bookmark: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default function Bookmark({ bookmark, onToggle, userId }) {
  return <button className={'bi bi-bookmark' + (bookmark ? '-fill' : '')} onClick={() => onToggle(userId)}></button>;
}

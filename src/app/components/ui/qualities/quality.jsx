import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../../../hooks/useQualities';

Quality.propTypes = {
  id: PropTypes.string.isRequired,
};

export default function Quality({ id }) {
  const { getQuality } = useQualities();
  const { _id, color, name } = getQuality(id);
  return (
    <span className={'badge m-1 bg-' + color} key={_id}>
      {name}
    </span>
  );
}

import React from 'react';
import PropTypes from 'prop-types';

export default function SearchStatus({ count }) {
  const comparator = count > 20 ? count - Math.trunc(count / 10) : count;
  return (
    <h5>
      {count > 0 ? (
        <div className="badge m-1 bg-primary">
          {count +
            (comparator === 1
              ? ' человек может '
              : comparator > 4 || comparator === 0
              ? ' человек могут '
              : ' человека могут ')}{' '}
          с Вами встретиться
        </div>
      ) : (
        <div className="badge m-1 bg-danger">Одно из представлений одиночества:</div>
      )}
    </h5>
  );
}

SearchStatus.propTypes = {
  count: PropTypes.number,
};

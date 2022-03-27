import React from 'react';
import PropTypes from 'prop-types';

Qualities.propTypes = {
  qualities: PropTypes.array.isRequired,
};

export default function Qualities({ qualities }) {
  return (
    <>
      {qualities.map((quality) => {
        return (
          <span key={'quality' + quality._id} className={'badge m-1 bg-' + quality.color}>
            {quality.name}
          </span>
        );
      })}
    </>
  );
}

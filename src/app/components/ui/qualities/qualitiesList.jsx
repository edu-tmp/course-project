import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import { useQualities } from '../../../hooks/useQualities';

QualitiesList.propTypes = {
  qualities: PropTypes.array,
};

export default function QualitiesList({ qualities }) {
  const { isLoading } = useQualities();
  if (isLoading) return 'Loading...';
  return (
    <>
      {qualities.map((qual) => (
        <Quality key={qual} id={qual} />
      ))}
    </>
  );
}

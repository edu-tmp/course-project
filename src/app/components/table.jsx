import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

Table.propTypes = {
  onSort: PropTypes.func,
  curSort: PropTypes.object,
  columns: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object),
  idProp: PropTypes.string,
};

export default function Table({ onSort, curSort, columns, data, idProp, ...rest }) {
  return (
    <table className="table">
      <TableHeader {...{ onSort, curSort, columns }} />
      <TableBody {...{ data, idProp, columns, ...rest }} />
    </table>
  );
}

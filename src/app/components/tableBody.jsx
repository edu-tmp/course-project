import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.object.isRequired,
  idProp: PropTypes.string.isRequired,
};

export default function TableBody({ data, columns, idProp }) {
  function renderContent(row, col) {
    const component = columns[col].component;
    return component ? (typeof component === 'function' ? component(row) : component) : _.get(row, columns[col].iter);
  }

  return (
    <tbody>
      {data.map((row) => (
        <tr key={row[idProp]}>
          {Object.keys(columns).map((col) => (
            <td key={col}>{renderContent(row, col)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

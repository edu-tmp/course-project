import React from 'react';
import PropTypes from 'prop-types';

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  curSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
};

export default function TableHeader({ onSort, curSort, columns }) {
  function handleSort(item) {
    item === curSort.iter
      ? onSort({ ...curSort, order: curSort.order === 'asc' ? 'desc' : 'asc' })
      : onSort({ iter: item, order: 'asc' });
  }

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((col) => {
          return (
            <th
              scope="col"
              key={col}
              onClick={columns[col].iter ? () => handleSort(columns[col].iter) : undefined}
              {...{ role: columns[col].iter && 'button' }}
            >
              {columns[col].name}
              <i
                className={
                  curSort.iter === columns[col].iter
                    ? curSort.order === 'asc'
                      ? 'bi bi-sort-down-alt'
                      : 'bi bi-sort-down'
                    : ''
                }
              ></i>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

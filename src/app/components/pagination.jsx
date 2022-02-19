import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  curPage: PropTypes.number.isRequired,
};

export default function Pagination({ itemsCount, pageSize, onPageChange, curPage }) {
  const pageCount = Math.ceil(itemsCount / pageSize);
  return (
    pageCount > 1 && (
      <nav>
        <ul className="pagination">
          {_.range(1, pageCount + 1).map((i) => {
            return (
              <li key={i} className={'page-item' + (i === curPage ? ' active' : '')}>
                <button className="page-link" onClick={() => onPageChange(i)}>
                  {i}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    )
  );
}

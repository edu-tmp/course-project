import React from 'react';
import PropTypes from 'prop-types';

GroupList.defaultProps = {
  idProp: '_id',
  valProp: 'name',
};
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onItemSelect: PropTypes.func.isRequired,
  idProp: PropTypes.string.isRequired,
  valProp: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
};
function GroupList({ items, onItemSelect, idProp, valProp, selectedItem }) {
  return (
    <ul className="list-group">
      {items.map((item) => {
        return (
          <li
            key={item[idProp]}
            className={'list-group-item' + (selectedItem && item[idProp] === selectedItem[idProp] ? ' active' : '')}
            onClick={() => onItemSelect(item)}
          >
            {item[valProp]}
          </li>
        );
      })}
    </ul>
  );
}

export default GroupList;

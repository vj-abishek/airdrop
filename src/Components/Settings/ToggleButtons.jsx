import React from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import Styles from '../../Styles/responsive.module.css';

export default function ToggleButtons({
  children,
  last,
  checked,
  handleChange,
}) {
  return (
    <div
      style={{ gridTemplateColumns: '50px 1fr 50px' }}
      className="grid p-3 pb-0 items-center"
    >
      {children}

      {last ? (
        <div className={`p-3 ${Styles.borderBorder}`}>
          <Switch
            checked={checked}
            onChange={handleChange}
            onColor="#2693e6"
            onHandleColor="#f2f2f9"
            offColor="#004552"
            handleDiameter={20}
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={38}
          />
        </div>
      ) : (
        <div className="p-3">
          <Switch
            checked={checked}
            onChange={handleChange}
            onColor="#2693e6"
            onHandleColor="#f2f2f9"
            offColor="#004552"
            handleDiameter={20}
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={38}
          />
        </div>
      )}
    </div>
  );
}

ToggleButtons.defaultProps = {
  last: false,
  checked: false,
  handleChange: () => {},
};

ToggleButtons.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
  ]).isRequired,
  handleChange: PropTypes.func,
  last: PropTypes.bool,
  checked: PropTypes.bool,
};

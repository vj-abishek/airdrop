import React, { useState } from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';

export default function ToggleButtons({ children, last }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => setChecked(!checked);

  return (
    <div
      style={{ gridTemplateColumns: '50px 1fr 50px' }}
      className="grid p-3 p-1 items-center"
    >
      {children}

      {last ? (
        <div className="p-3 borderBorder">
          <Switch
            checked={checked}
            onChange={handleChange}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
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
            onColor="#86d3ff"
            onHandleColor="#2693e6"
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
};

ToggleButtons.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
  ]).isRequired,
  last: PropTypes.bool,
};

import React, { useState } from 'react';
import Switch from 'react-switch';

export default function ToggleButtons({ children }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => setChecked(!checked);

  return (
    <div
      style={{ gridTemplateColumns: '50px 1fr 50px' }}
      className="grid p-3 gap-1 ml-2"
    >
      {children}

      <Switch
        checked={checked}
        onChange={handleChange}
        handleDiameter={8}
        uncheckedIcon={false}
        checkedIcon={false}
        offColor="#004552"
        onColor="#00B2D2"
        onHandleColor="#F4F4F9"
        offHandleColor="#F4F4F9"
        height={20}
        width={40}
        className="react-switch"
        id="small-radius-switch"
      />
    </div>
  );
}

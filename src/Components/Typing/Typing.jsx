import React from 'react';
import './Typing.css';

const Typing = ({ show }) => (
  <div
    className="ticontainer"
    style={show ? { display: 'block' } : { display: 'none' }}
  >
    <div className="tiblock">
      <div className="tidot" />
      <div className="tidot" />
      <div className="tidot" />
    </div>
  </div>
);

export default Typing;

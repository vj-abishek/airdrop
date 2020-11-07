import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Main({ href, children }) {
  return (
    <NavLink to={href}>
      <div
        style={{ gridTemplateColumns: '50px 1fr 50px' }}
        className="grid p-3 pb-0 items-center"
      >
        {children}

        <div className="p-3">
          <svg
            width="13"
            height="21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.638 18.288l7.983-8.234L.387 2.07 2.14.262 12.183 10 2.447 20.04.638 18.288z"
              fill="#F4F4F9"
            />
          </svg>
        </div>
      </div>
    </NavLink>
  );
}

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
  ]).isRequired,
  href: PropTypes.string.isRequired,
};

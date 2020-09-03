import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Styles from '../../Styles/responsive.module.css';

export default function Header({ children, back, home }) {
  const history = useHistory();
  const handleClick = () => {
    history.goBack();
  };

  return (
    <header
      className={`${Styles.borderBorder} z-50 bg-primary font-sans p-2 pl-4 text-lg text-white sticky font-bold top-0 w-full`}
    >
      {back ? (
        <div className="flex items-center ">
          <div
            aria-label="Back"
            role="button"
            data-focusable="true"
            tabIndex="0"
            onClick={handleClick}
            onKeyPress={handleClick}
            className="outline-none cursor-pointer p-2 w-10 h-10 text-center rounded-full hover:bg-secondary mr-3"
          >
            <svg viewBox="0 0 24 24" className="fill-current text-accent pr-3 ">
              <g>
                <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z" />
              </g>
            </svg>
          </div>

          <span>{children}</span>
        </div>
      ) : (
        <div className="p-1 flex items-center ">
          {window.innerWidth <= 768 && home && (
            <div className="mr-5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.6161 12.4219C27.8862 -5.02801 3.32812 24 3.32812 24C3.32812 24 6.85509 18.8163 6.85509 12.4219C21.6161 2.58047 3.32812 0.84375 3.32812 0.84375C3.32812 0.84375 15.3459 29.8718 21.6161 12.4219Z"
                  fill="#F4F4F9"
                />
              </svg>
            </div>
          )}

          <span>{children}</span>
        </div>
      )}
    </header>
  );
}

Header.defaultProps = {
  back: false,
  home: false,
};

Header.propTypes = {
  back: PropTypes.bool,
  children: PropTypes.string.isRequired,
  home: PropTypes.bool,
};

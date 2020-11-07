import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import BackButon from './BackButton';
import Photo from './Photo';
import Styles from '../../../../Styles/responsive.module.css';
import { Call } from '../../../../Store/Actions/Peer';

function Header({ setVoiceCall }) {
  const [toggle, setToggle] = useState(false);
  const { id } = useParams();

  const handleClick = () => {
    setToggle(!toggle);
  };

  const handleVoiceCall = () => {
    setToggle(false);
    setVoiceCall(true, id);
  };

  const handleVideoCall = () => {
    setToggle(false);
  };
  return (
    <header
      className={`flex flex-row bg-primary px-3 sticky z-50 top-0 w-full items-center justify-between ${
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? Styles.borderBorder
          : 'shadow-md'
      }`}
    >
      <div className="flex justify-between">
        <BackButon />
        <Photo />
      </div>
      <div
        data-focusable="true"
        aria-label="Menu"
        role="presentation"
        onClick={handleClick}
        onKeyPress={handleClick}
        // onBlur={() => setToggle(false)} TODO:Need to fix it
        className="flex p-2  items-center cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="text-accent p-2 w-10 h-10"
        >
          <path
            fill="currentColor"
            d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
          />
        </svg>
      </div>

      {/* Menu  */}

      <div
        style={{
          zIndex: '999999',
          maxWidth: '340px',
          overflow: 'hidden',
          top: '44px',
          right: '30px',
        }}
        className={`absolute bg-gray-700 px-4 py-3 text-sm rounded-md outline-none flex flex-col justify-around ${
          toggle ? Styles.animate : Styles.default
        }`}
      >
        <div
          onClick={handleVoiceCall}
          onKeyDown={handleVoiceCall}
          role="presentation"
          className={`grid mb-2 items-center cursor-pointer  ${Styles.grid1}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 0 24 24"
            className="text-light fill-current"
            width="20"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
          </svg>
          <div className="ml-2">Call</div>
        </div>
        <div
          onClick={handleVideoCall}
          onKeyDown={handleVideoCall}
          role="presentation"
          className={`grid items-center cursor-pointer ${Styles.grid1}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 0 24 24"
            className="text-light fill-current"
            width="20"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
          </svg>
          <div className="ml-2">Video call</div>
        </div>
      </div>
    </header>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setVoiceCall: (bool, channelId) => dispatch(Call(bool, channelId)),
});

Header.defaultProps = {
  setVoiceCall: PropTypes.func,
};

Header.propTypes = {
  setVoiceCall: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Header);

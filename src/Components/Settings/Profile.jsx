import React from 'react';
import { connect } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import Styles from '../../Styles/responsive.module.css';

function Profile({ user }) {
  return (
    <div
      style={{ gridTemplateColumns: '60px 1fr' }}
      className="grid p-3 gap-1 cursor-pointer"
    >
      <div className="w-12 h-12 bg-secondary rounded-full">
        <img src={user.photoURL} className="rounded-full" alt="Your Profile" />
      </div>
      <div
        className={`w-auto font-sans flex flex-col justify-between ${Styles.borderBorder} pb-2`}
      >
        <div className="text-white text-lg">
          <span>{user.isAnonymous && '~ '}</span>
          <span>{user?.displayName || 'Github User'}</span>
        </div>
        <div className="text-light text-xs">
          Last login
          {user.metadata.lastSignInTime &&
            formatDistanceToNow(new Date(user.metadata.lastSignInTime), {
              addSuffix: true,
            })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});

Profile.defaultProps = {
  user: {
    displayName: 'Loading...',
    photoURL: '',
    isAnonymous: true,
    metadata: {
      lastSignInTime: '',
    },
  },
};

Profile.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    photoURL: PropTypes.string.isRequired,
    isAnonymous: PropTypes.bool,
    metadata: PropTypes.shape({
      lastSignInTime: PropTypes.string,
    }),
  }),
};

export default connect(mapStateToProps)(Profile);

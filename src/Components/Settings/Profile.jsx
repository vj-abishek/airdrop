import React from 'react';
import { connect } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

function Profile({ user }) {
  return (
    <div
      style={{ gridTemplateColumns: '60px 1fr' }}
      className="grid p-3 gap-1 ml-2"
    >
      <div className="w-12 h-12 bg-secondary rounded-full">
        <img src={user.photoURL} className="rounded-full" alt="Your Profile" />
      </div>
      <div className="w-auto font-sans flex flex-col justify-between borderBorder pb-2">
        <div className="text-white text-lg">
          <span>{user.isAnonymous && '~ '}</span>
          <span>{user.displayName}</span>
        </div>
        <div className=" text-gray-500 text-xs">
          Last login -{' '}
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
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/abigo-share.appspot.com/o/Guest%20(1).jpg?alt=media&token=3e3fb84b-eec0-40a4-97e6-354a408b9c66',
    isAnonymous: true,
    metadata: {
      lastSignInTime: '',
    },
  },
};

Profile.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    isAnonymous: PropTypes.bool,
    metadata: PropTypes.shape({
      lastSignInTime: PropTypes.string,
    }),
  }),
};

export default connect(mapStateToProps)(Profile);

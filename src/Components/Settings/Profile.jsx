import React, {useState} from 'react';
import { connect } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import EditProfile from './EditProfile';
import Styles from '../../Styles/responsive.module.css';

function Profile({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <div
      style={{ gridTemplateColumns: '60px 1fr 30px' }}
      className="grid p-3 gap-1 cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      <div className="w-12 h-12 bg-secondary rounded-full">
        <img src={user.photoURL} className="rounded-full" alt="Your Profile" />
      </div>
      <div
        className={`w-auto font-sans flex flex-col justify-between ${Styles.borderBorder} pb-2`}
      >
        <div className="text-white text-lg">
          <span>{user.isAnonymous && '~ '}</span>
          <span>{user?.displayName || 'User'}</span>
        </div>
        <div className="text-light text-xs">
          Last login{' '}
          {user.metadata.lastSignInTime &&
            formatDistanceToNow(new Date(user.metadata.lastSignInTime), {
              addSuffix: true,
            })}
        </div>
      </div>
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
      </svg>
      </div>
    </div>
    <EditProfile isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
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

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import 'pattern.css/dist/pattern.min.css';
import { fetchSlug } from '../../Store/Actions/Firestore';
import { google, guest } from '../../Store/Actions/Login';

function Invite({ fetchL, invite, login, guestL, LoginState }) {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchL(id);
    }
  }, [fetchL, id]);

  return (
    <div
      style={{ color: '#004552' }}
      className="w-screen fixed top-0 h-screen z-0 pattern-cross-dots-xl"
    >
      <header className="text-white text-2xl flex flex-row p-5 w-screen justify-center lg:justify-start">
        <svg
          style={{ width: '37px', height: '37px' }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.6161 12.4219C27.8862 -5.02801 3.32812 24 3.32812 24C3.32812 24 6.85509 18.8163 6.85509 12.4219C21.6161 2.58047 3.32812 0.84375 3.32812 0.84375C3.32812 0.84375 15.3459 29.8718 21.6161 12.4219Z"
            fill="#F4F4F9"
          />
        </svg>
        <span className=" font-bold uppercase font-sans pl-3"> Relp</span>
      </header>

      <div
        style={{ height: 'calc(100vh - 200px)' }}
        className="flex justify-center items-center w-screen"
      >
        <div
          style={{ transition: 'height .75s ease' }}
          className="w-11/12 flex font-sans justify-center items-center flex-col bg-secondary rounded p-3 lg:w-1/3 "
        >
          {invite && (
            <>
              <img
                src={invite.photoURL}
                alt="Loading..."
                className=" w-20 h-20 rounded-full m-2"
              />
              <div className="text-sm text-gray-400">
                {invite.displayName} invited you to join
              </div>
              <div className="text-white text-2xl font-semibold">
                {invite.displayName}
                's room
              </div>
              <div className="text-sm text-gray-500">
                Continue with one of the following:
              </div>
              <div className="text-accent text-sm">{LoginState?.message}</div>
              <div
                role="button"
                tabIndex={0}
                onClick={() => login()}
                onKeyDown={() => login()}
                className="mt-3 w-full shadow-lg p-2 text-center text-white bg-red-600 rounded-full"
              >
                Continue with Google
              </div>
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() => guestL()}
                onClick={() => guestL()}
                className="mt-3 shadow-lg w-full p-2 text-center text-white bg-primary rounded-full"
              >
                Continue as a Guest
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  invite: state.firestoreReducer.invite,
  LoginState: state.authReducer.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchL: (id) => dispatch(fetchSlug(id)),
  login: () => dispatch(google()),
  guestL: () => dispatch(guest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Invite);

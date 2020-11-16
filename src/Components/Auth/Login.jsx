import React from 'react';
import { connect } from 'react-redux';
import { google, github, facebook, guest } from '../../Store/Actions/Login';
import { Redirect } from 'react-router-dom';
import Styles from '../../Styles/responsive.module.css';

function Login({
  googleLogin,
  githubLogin,
  loginState,
  loginError,
  facebookLogin,
  guestLogin,
}) {
  const { search } = window.location;
  if (loginState.authenticated && search.includes('/join')) {
    const params = new URLSearchParams(search);
    return <Redirect to={params.get('url')} />;
  }

  if (loginState.authenticated && !search.includes('/join'))
    return <Redirect to="/" />;

  return (
    <div className="font-sans flex flex-col sm:flex-row">
      <div className="bg-color w-screen h-12 sm:h-screen sm:width-login sm:order-2" />
      <div className="font-medium w-full h-aut sm:w-auto py-20 p-6">
        <header className="text-white font-semibold text-4xl center">
          Relp
        </header>
        <h1 className={`${Styles.gray1} text-xl`}>
          Login with one of the following:
        </h1>
        {loginState.isLoading ? (
          <p className="text-accent">Loading...</p>
        ) : (
          <p className="text-accent">{loginError?.message}</p>
        )}

        <form>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              googleLogin();
            }}
            className="my-4 p-4 text-white w-full bg-red-700 rounded-full"
          >
            <div className="flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12C6 15.3137 8.68629 18 12 18C14.6124 18 16.8349 16.3304 17.6586 14H12V10H21.8047V14H21.8C20.8734 18.5645 16.8379 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.445 2 18.4831 3.742 20.2815 6.39318L17.0039 8.68815C15.9296 7.06812 14.0895 6 12 6C8.68629 6 6 8.68629 6 12Z"
                  fill="currentColor"
                />
              </svg>
              <span className="mx-2">Google</span>
            </div>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              githubLogin();
            }}
            type="submit"
            className="my-4 p-4 text-white w-full  bg-black rounded-full"
          >
            <div className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                focusable="false"
                width="24"
                height="24"
                data-prefix="fab"
                data-icon="github"
                className="svg-inline--fa fa-github fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path
                  fill="currentColor"
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                />
              </svg>
              <span className="mx-2">Github</span>
            </div>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              facebookLogin();
            }}
            type="submit"
            className="my-4 p-4 text-white w-full  bg-blue-800 rounded-full"
          >
            <div className="flex items-center justify-center">
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                focusable="false"
                data-prefix="fab"
                data-icon="facebook"
                className="svg-inline--fa fa-facebook fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                ></path>
              </svg>
              <span className="mx-2">Facebook</span>
            </div>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              guestLogin();
            }}
            type="submit"
            id="Login"
            className="my-4 p-4 text-white w-full bg-secondary rounded-full"
          >
            Login as a Guest
          </button>
        </form>
        <p className={`px-2 ${Styles.gray1}`}>
          Or looking for version 1?
          <span>
            <a
              target="blank"
              className="px-2 text-accent"
              href="https://v1-safeshare.now.sh"
            >
              go here
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginState: state.authReducer,
    loginError: state.authReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  googleLogin: () => dispatch(google()),
  githubLogin: () => dispatch(github()),
  facebookLogin: () => dispatch(facebook()),
  guestLogin: () => dispatch(guest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

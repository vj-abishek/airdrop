import React, { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { userState } from './Store/Actions/Login';
import Loading from './Components/Animation/Loading';
import { ToastProvider } from 'react-toast-notifications';
import Content from './Components/Animation/Content';
import Header from './Components/Home/Header/Header';
import Toast from './Components/Utils/Toast';
import './Styles/main.css';

const Auth = lazy(() => import('./Components/Auth/Login'));
const Home = lazy(() => import('./Components/Home/Home'));
const About = lazy(() => import('./Components/About/About'));
const Invite = lazy(() => import('./Components/Invite/Invite'));
const Settings = lazy(() => import('./Components/Settings/Settings'));
const Create = lazy(() => import('./Components/Create/Create'));
const Logout = lazy(() => import('./Components/Utils/Logout'));
const Channel = lazy(() => import('./Components/Invite/Channel'));
const Room = lazy(() => import('./Components/Channel/Channel'));
const Page404 = lazy(() => import('./Components/404/FNF'));

// TODO: Clean this when complete
const Chat = lazy(() => import('./Components/Chat/Chat'));
const Qrcode = lazy(() => import('./Components/QRcode/Qrcode'));
const Join = lazy(() => import('./Components/Join/Join'));

function App({ loginState, init }) {
  useEffect(() => {
    init();
  }, [init]);

  const path = window.location.pathname;
  const slug = path.split('/')[2];

  return (
    <Router>
      {/* Wait for the AuthState */}

      {loginState.isLoginLoading && <Loading />}

      {/*  Check for Auth State and Redirect */}

      {!loginState.isLoginLoading &&
        !loginState.authenticated &&
        !path.includes('/invite') && <Redirect to="/login" />}

      {!loginState.isLoginLoading &&
        loginState.authenticated &&
        path.includes('/invite') && <Redirect to={'/channel/' + slug} />}

      {/* Unauthenticated Route */}
      <Suspense fallback={<Content />}>
        <Switch>
          <Route path="/login" component={Auth} />
          <Route path="/invite/:id" component={Invite} />
        </Switch>
      </Suspense>

      <ToastProvider>
        <Toast />
      </ToastProvider>

      {/* Protected Routes */}

      {loginState.authenticated && (
        <div className="lg:grid lg:grid-cols-4 ">
          <Header />
          <Suspense fallback={<Content />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/settings" component={Settings} />
              <Route path="/about" component={About} />
              <Route path="/create" component={Create} />
              <Route path="/logout" component={Logout} />
              <Route path="/channel/:id" component={Channel} />
              <Route path="/room/:id" component={Room} />
              <Route path="/qrcode" component={Qrcode} />
              <Route path="/j/:id" component={Join} />
              <Route path="/Chat/:id" component={Chat} />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </div>
      )}
    </Router>
  );
}

const mapStateToProps = (state) => ({
  loginState: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  init: () => dispatch(userState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

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
import './Styles/responsive.css';


// Lazy load the components
const Auth = lazy(() => import('./Components/Auth/Login'));
const Home = lazy(() => import('./Components/Home/Home'));
const About = lazy(() => import('./Components/About/About'));
const Invite = lazy(() => import('./Components/Invite/Invite'));
const Qrcode = lazy(() => import('./Components/QRcode/Qrcode'));
const Join = lazy(() => import('./Components/Join/Join'));
const Chat = lazy(() => import('./Components/Chat/Chat'));
const Settings = lazy(() => import('./Components/Settings/Settings'));
const Create = lazy(() => import('./Components/Create/Create'));
const Logout = lazy(() => import('./Components/Utils/Logout'));
const Channel = lazy(() => import('./Components/Invite/Channel'));
const Page404 = lazy(() => import('./Components/404/FNF'));



function App({ loginState, init, aerror, ferror }) {
  // Initilize the state
  useEffect(() => {
    init();
  }, [init]);

  // const { addToast } = useToasts();

  const path = window.location.pathname;

  const slug = path.split('/')[2];

  // if (aerror) {
  //   addToast(aerror.message, { appearance: 'error', autoDismiss: true });
  // }
  // if (ferror) {
  //   addToast(ferror.message, { appearance: 'error', autoDismiss: true });
  // }

  return (
    <Router >
      {/* Wait for the AuthState */}

      {loginState.isLoginLoading && <Loading />}


      {/*  Check for Auth State and Redirect */}

      {!loginState.isLoginLoading && !loginState.authenticated && !path.includes('/invite') && (
        <Redirect to="/login" />
      )}

      {!loginState.isLoginLoading && loginState.authenticated && path.includes('/invite') && (
        <Redirect to={"/channel/" + slug} />
      )}

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

const mapStateToProps = (state) => {
  return {
    loginState: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => dispatch(userState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// <Route path="/create_user_name" component={Login} />
// <Route path="/list/:id" component={List} />
//
// <Route path="/auto" component={Auto} />
// <Route path="/share" component={Share} />
//
//
// <Route path="/toast" component={Toast} />

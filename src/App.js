import React, { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
// import { Router, Redirect } from '@reach/router';
// import history from './Components/history';
import './Styles/main.css';
import './Styles/responsive.css';
import Auth from './Components/Auth/Login';
import { connect } from 'react-redux';
import { userState } from './Store/Actions/Login';
import Loading from './Components/Animation/Loading';
import Header from './Components/Home/Header/Header';

//lazy load the components
// const Login = lazy(() => import('./Components/Login/Login'));


// eslint-disable-next-line
const Home = lazy(() => import('./Components/Home/Home'));
// const List = lazy(() => import('./Components/List/List'));
// const Auto = lazy(() => import('./Components/Auto/AutoPage'));
// const Share = lazy(() => import('./Components/Share/Share'));
const Qrcode = lazy(() => import('./Components/QRcode/Qrcode'));
const Join = lazy(() => import('./Components/Join/Join'));
// const Toast = lazy(() => import('./Components/Alert/Toast'));
const Chat = lazy(() => import('./Components/Chat/Chat'));
const Settings = lazy(() => import('./Components/Settings/Settings'));
const Page404 = lazy(() => import('./Components/404/FNF'));



function App({ loginState, init }) {
  // Initilize the state
  useEffect(() => {
    init();
  }, [init]);

  return (
    <Router >
      {/*  Check for Auth State and Redirect */}

      {!loginState.isLoginLoading && !loginState.authenticated && (
        <Redirect to="/login" />
      )}

      {/* Wait for the AuthState */}

      {loginState.isLoginLoading && <Loading />}

      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/login" component={Auth} />
        </Switch>

        {loginState.authenticated && (
          <div className="lg:grid lg:grid-cols-4 ">
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/settings" component={Settings} />
              <Route path="/qrcode" component={Qrcode} />
              <Route path="/j/:id" component={Join} />
              <Route path="/Chat/:id" component={Chat} />
              <Route component={Page404} />
            </Switch>
          </div>
        )}
      </Suspense>
    </Router>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
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

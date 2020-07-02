import React, { lazy, Suspense } from 'react'
import './App.css'
import { Router, Switch, Route } from 'react-router-dom'
import history from './Components/history'
//lazy load the components
const Login = lazy(() => import('./Components/Login/Login'))
const Home = lazy(() => import('./Components/Home/Home'))
const List = lazy(() => import('./Components/List/List'))
const Chat = lazy(() => import('./Components/Chat/Chat'))
const Auto = lazy(() => import('./Components/Auto/AutoPage'))
const Share = lazy(() => import('./Components/Share/Share'))
const Qrcode = lazy(() => import('./Components/QRcode/Qrcode'))
const Join = lazy(() => import('./Components/Join/Join'))
const Toast = lazy(() => import('./Components/Alert/Toast'))
const Page404 = lazy(() => import('./Components/404/FNF'))

function App() {
  return (
    <Router history={history}>
      <div className='App'>
        <Suspense
          fallback={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontFamily: "'Ubuntu', sans-serif",
                fontSize: '30px',
              }}
            >
              Loading..
            </div>
          }
        >
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/create_user_name'>
              <Login />
            </Route>
            <Route path='/list/:id'>
              <List />
            </Route>
            <Route path='/Chat/:id'>
              <Chat />
            </Route>
            <Route path='/auto'>
              <Auto />
            </Route>
            <Route path='/share'>
              <Share />
            </Route>
            <Route path='/qrcode'>
              <Qrcode />
            </Route>
            <Route path='/join/:id'>
              <Join />
            </Route>
            <Route path='/toast'>
              <Toast />
            </Route>
            <Route component={Page404} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}

export default App;

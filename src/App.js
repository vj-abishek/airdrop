import React, { lazy, Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
const Header = lazy(() => import('./Components/Header'))
const Section = lazy(() => import('./Components/Section'))
const Article = lazy(() => import('./Components/Section/Article'))
const Footer = lazy(() => import('./Components/Footer'))
const Login = lazy(() => import('./Components/Login/index'))

function App() {
  return (
    <Router>
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
                fontSize: '30px'
              }}
            >
              Loading..
            </div>
          }
        >
          <Switch>
            <Route path='/create_user_name'>
              <Login />
            </Route>
          </Switch>
          <Header />
          <Section />
          <Article />
          <Footer />
        </Suspense>
      </div>
    </Router>
  )
}

export default App

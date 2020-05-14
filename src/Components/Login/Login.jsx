import React, { useReducer, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { setUser } from '../../State/action'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

function Login() {
  // eslint-disable-next-line
  const [socket, dispatch] = useReducer(setUser, '')

  const [state, setState] = useState({ name: '' })

  const createUSer = (e) => {
    e.preventDefault()
    let name = state.name

    dispatch({ type: 'SET_NAME', name })
  }
  return (
    <div className='container_for_div'>
      <Helmet>
        <title>Safeshare.live - Create Name</title>
        <link rel='canonical' href='https://safeshare.live/' />
        <meta
          name='description'
          content='SafeShare.live is a online file sharing service. 1. Create a name. 2. Choose a person and send the file realtime'
        />
      </Helmet>
      <div className='Create_user'>
        <div className='aboutsection_of_me'>
          <h2 style={{ marginLeft: '15px' }}>Why use SafeShare?</h2>
          <br />
          <ul>
            <li>
              Share your files with anyone anywhere in the world, in realtime
              along with peer to peer communication.
            </li>
            <li>
              Begin sharing your files after 3 simple Steps. Easy as a Breeze!
            </li>
            <li>
              Transfer important files and documents without the nightmare of
              having them leaked.
            </li>
            <li>
              This website is built upon WEBRTC, a realtime communication
              system. Your Data won't be stored in our Servers, so share with
              the assurance of privacy and security.
            </li>
          </ul>
        </div>
        <div className='login_section'>
          <h2 style={{ color: '#3F3D56' }}>Create User</h2>
          <ul>
            <li>Step 1: Create a temporary username</li>
            <li>Step 2: Choose the user to whom you want to send the file</li>
          </ul>
          <form autoComplete='off' onSubmit={createUSer}>
            <TextField
              id='outlined-basic'
              label='Choose temporary Name'
              variant='outlined'
              onChange={(e) => setState({ name: e.target.value })}
              autoFocus
            />
            <br />
            <br />

            <Button variant='contained' color='primary' type='submit'>
              Create Me
            </Button>
            <Button style={{ marginLeft: '10px' }}>
              {' '}
              <Link to='/qrcode'>Generate Qrcode</Link>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login

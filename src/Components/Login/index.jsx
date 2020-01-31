import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// import { makeStyles } from '@material-ui/core/styles'

export default function index() {
  return (
    <div className='container_for_div'>
      <div className='Create_user'>
        <div className='aboutsection_of_me'>
          <h2 style={{ marginLeft: '15px' }}>Why use Airdrop?</h2>
          <br />
          <ul>
            <li>
              Send your files with anyone around the world , realtime with peer
              to peer communication!
            </li>
            <li>Share your files with 3 simple Steps. Easy as a Breeze</li>
            <li>
              Transfer your important files and documents without worrying or
              without being leaked
            </li>
            <li>
              This website is build upon WEBRTC, a realtime communication
              system. Your Data wont be stored in our Servers, So Share
              Privately and securely
            </li>
          </ul>
        </div>
        <div className='login_section'>
          <h2 style={{ color: '#3F3D56' }}>Create User</h2>
          <ul>
            <li>
              Step 1: Go to{' '}
              <a href='https://airdrop.netlify.com' target='blank'>
                https://airdrop.netlify.com
              </a>
            </li>
            <li>Step 2: Create a temporary User</li>
            <li>Step 3: Choose the user to whom you want to send the file</li>
          </ul>
          <form autoComplete='off'>
            <TextField
              id='outlined-basic'
              label='Choose temporary Name'
              variant='outlined'
              onChange={v => console.log(v.target.value)}
            />
          </form>
          <br />
          <Button variant='contained' color='primary'>
            Create Me
          </Button>
        </div>
      </div>
    </div>
  )
}

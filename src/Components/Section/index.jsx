import React from 'react'
import Svg from '../../img/undraw_share_online_r87b.svg'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

export default function index() {
  return (
    <section>
      <div className='text-showcase'>
        <div className='text-showcase-real'>
          <h1>Share files securely</h1>
          <p>Share your files anywhere with peer </p>
          <p style={{ marginTop: '-20px' }}>to peer communication</p>
        </div>
        <Link
          to='/create_user_name'
          style={{ color: '#fff', textDecoration: 'none' }}
        >
          <Button variant='contained' color='primary'>
            Share Now
          </Button>
        </Link>
      </div>
      <div>
        <img src={Svg} className='img-svg-real' alt='Share your files' />
      </div>
    </section>
  )
}

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function index() {
  return (
    <header className='header'>
      <div className='logo' title='SafeShare logo'>
        <Link
          to='/'
          title='Home Page URL'
          style={{ color: '#fff', textDecoration: 'none' }}
        >
          <span className='color-diff'>Safe</span>
          <span className='color-difference'>share</span>
        </Link>
      </div>
      <div className='share-button'>
        <Link
          to='/auto'
          title='Share files'
          style={{ color: '#fff', textDecoration: 'none' }}
        >
          <Button variant='contained' color='primary'>
            Share Files
          </Button>
        </Link>
      </div>
    </header>
  );
}

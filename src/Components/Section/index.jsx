import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Svg from '../../img/undraw_share_online_r87b.svg';
import Png from '../../img/share.png';

export default function index() {
  return (
    <section>
      <div className="text-showcase">
        <div className="text-showcase-real">
          <h1>Share files securely</h1>
          <p>Share your files anywhere with peer </p>
          <p style={{ marginTop: '-20px' }}>to peer communication</p>
        </div>
        <Link
          to="/create_user_name"
          alt="Share files"
          title="Share files"
          style={{ color: '#fff', textDecoration: 'none', marginLeft: '15px' }}
        >
          <Button variant="contained" color="primary">
            Share Now
          </Button>
        </Link>
      </div>
      <div>
        <picture
          className="img-svg-real"
          alt="SafeShare.live - Online file sharing"
          title="SafeShare.live - Online file sharing"
        >
          <source media="(min-width:1024px)" srcSet={Png} />
          <source media="(min-width:465px)" srcSet={Svg} />
          <img
            className="img-svg-real"
            src={Svg}
            alt="SafeShare.live - Online file sharing"
            title="SafeShare.live - Online file sharing"
          />
        </picture>
      </div>
    </section>
  );
}

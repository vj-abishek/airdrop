import React, { useEffect, useState } from 'react';
import peer from '../Peer';

export default function Test(props) {
  const [message, setMessage] = useState([]);
  const handleMe = (data) => {
    const parsed = JSON.parse(data);
    console.log(parsed);
    setMessage((old) => [...old, parsed]);
  };

  useEffect(() => {
    peer.on('data', handleMe);
    return () => peer.off('data', handleMe);
  }, [message]);
  return (
    <>
      {message.map((data) => (
        <div key={data.id} ref={props.list}>
          <p style={{ color: '#fff', marginLeft: '5px' }}>
            <span style={{ color: '#ababab' }}>{data.name}</span> :{' '}
            {data.message}
          </p>
        </div>
      ))}
    </>
  );
}

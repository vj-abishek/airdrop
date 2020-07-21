import React from 'react';
import Typing from '../Typing/Typing';

export default function Message({ data, forwardedRef }) {
  const handleClick = (e) => {
    e.target.style.display = 'none';
  };
  return (
    <div className={data.self ? 'home_message self' : 'home_message parent'}>
      <div
        ref={forwardedRef}
        style={{ display: 'flex', flexDirection: 'row', transition: '1s' }}
        className={data.self ? 'child_home selfCont' : 'child_home parentCont'}
      >
        {data.typing ? (
          <div
            style={{
              margin: '12px',
              fontSize: '14px',
              textOverflow: 'clip',
              overflow: 'overlay',
            }}
          >
            <Typing show={data.typing} />
          </div>
        ) : (
          <Typing show={false} />
        )}
        {data.message && (
          <div
            style={{
              margin: '12px',
              fontSize: '14px',
             	overflow-wrap: break-word;
            }}
          >
            <span>{data.message}</span>
          </div>
        )}

        {data.url && !data.self && (
          <a
            href={data.url}
            download={data.message}
            onClick={handleClick}
            title={`Download "${data.message}"`}
            style={{
              textDecoration: 'none',
              color: '#fff',
              lineHeight: '3.6',
              height: '30px',
              marginRight: '10px',
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 34 34'
              width='28'
              height='28'
            >
              <path
                fill='currentColor'
                d='M17 2c8.3 0 15 6.7 15 15s-6.7 15-15 15S2 25.3 2 17 8.7 2 17 2m0-1C8.2 1 1 8.2 1 17s7.2 16 16 16 16-7.2 16-16S25.8 1 17 1z'
              ></path>
              <path
                fill='currentColor'
                d='M22.4 17.5h-3.2v-6.8c0-.4-.3-.7-.7-.7h-3.2c-.4 0-.7.3-.7.7v6.8h-3.2c-.6 0-.8.4-.4.8l5 5.3c.5.7 1 .5 1.5 0l5-5.3c.7-.5.5-.8-.1-.8z'
              ></path>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

import React from 'react';

export default function ImageCon({ data, messageContainer, imageID }) {
  return (
    <div
      className={data.self ? 'imageSelf' : 'imageParent'}
      ref={messageContainer}
    >
      <div className='img-container-real'>
        <div className='inside'>
          <a href={data.url} target='_blank' rel='noopener noreferrer'>
            <img width='100%' src={data.url} ref={imageID} alt={data.type} />
            <div className='_1i3Za'></div>
          </a>
        </div>
        <div className='_1uFFm'>
          <div className='_1DZAH _2Pjvv' role='button'>
            <span className='_3EFt_' dir='auto'>
              {new Date(data.sentAt).toLocaleTimeString()}
            </span>
            <div className='jdhpF'>
              <span data-icon='msg-dblcheck' className='_209Po _1xtH9 _3f3C2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 15'
                  width='16'
                  height='15'
                >
                  <path
                    fill='royalblue'
                    d='M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z'
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

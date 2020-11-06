import React, { useRef } from 'react';
import { format } from 'date-fns';
import DOMPurify from 'dompurify';
import { Circle } from 'rc-progress';
import marked from 'marked';
import { connect } from 'react-redux';
import Styles from '../../../../Styles/responsive.module.css';

// marked.Renderer.prototype.paragraph = (text) => `${text}\n`;

function sanitize(text) {
  return marked(
    DOMPurify.sanitize(text, {
      FORBID_ATTR: ['onerror', 'onload', 'style'],
      FORBID_TAGS: [
        'script',
        'iframe',
        'audio',
        'video',
        'style',
        'input',
        'canvas',
        'form',
        'textarea',
        'table',
      ],
    }),
  );
}
const DownloadComponent = ({ status, data }) => {
  const downloadRef = useRef(null);

  const handleClick = () => {
    downloadRef.current.style.display = 'none';
  };

  return (
    <a
      href={data.url}
      download={data.name}
      title={`Download"${data.name}"`}
      ref={downloadRef}
      onClick={handleClick}
      className={`text-gray-600 mx-1 ${
        data.shareID === status.shareID && status.progress !== 100 && 'hidden'
      } ${Styles.download}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 34 34"
        width="29"
        height="29"
      >
        <path
          fill="currentColor"
          d="M17 2c8.3 0 15 6.7 15 15s-6.7 15-15 15S2 25.3 2 17 8.7 2 17 2m0-1C8.2 1 1 8.2 1 17s7.2 16 16 16 16-7.2 16-16S25.8 1 17 1z"
        />
        <path
          fill="currentColor"
          d="M22.4 17.5h-3.2v-6.8c0-.4-.3-.7-.7-.7h-3.2c-.4 0-.7.3-.7.7v6.8h-3.2c-.6 0-.8.4-.4.8l5 5.3c.5.7 1 .5 1.5 0l5-5.3c.7-.5.5-.8-.1-.8z"
        />
      </svg>
    </a>
  );
};

const Utils = ({ data, openTab, uid, status }) => {
  if (/^image/gi.test(data.type)) {
    return (
      <>
        <div className={`${Styles.img_container_real} font-sans`}>
          {data.shareID === status.shareID && status.progress !== 100 && (
            <div className={Styles.progress_ring}>
              <Circle
                percent={status.progress}
                strokeWidth="4"
                strokeColor="#004552"
              />
            </div>
          )}
          <div
            className={`${Styles.inside} ${
              data.shareID === status.shareID &&
              status.progress !== 100 &&
              Styles.blur
            }`}
          >
            <img src={data.url} alt={data.name} title={data.name} />
          </div>
          <span className={Styles.hwx} />
        </div>
        <div className={Styles.meta}>
          <span style={{ fontSize: '10.5px' }} className={Styles.gray1}>
            {format(new Date(data.time), 'hh:mm a') || NaN}
          </span>
        </div>
      </>
    );
  }
  if (data.type === 'application/pdf') {
    return (
      <div className="flex flex-row items-center justify-around">
        <div className={`${Styles.other_img} ${Styles.pdf}`} />
        <div style={{ fontSize: '0.9rem' }} className="font-sans mx-2">
          {data.name}
        </div>
        {data.shareID === status.shareID && status.progress !== 100 && (
          <div
            style={{ width: '29px', height: '29px', minWidth: '29px' }}
            className="mx-1"
          >
            <Circle
              percent={status.progress}
              strokeWidth="4"
              strokeColor="#00b2d2"
            />
          </div>
        )}
        <DownloadComponent status={status} data={data} />
      </div>
    );
  }
  if (data.type === 'text/plain') {
    return (
      <>
        <div
          className="flex"
          style={{
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          <div
            style={{
              fontSize: '14.2px',
            }}
            onClick={openTab}
            role="presentation"
            onKeyPress={(e) => console.log(e)}
            className={`${Styles.text_wrapper_sanitize} ${
              !(data.from === uid) && 'otherStyle'
            }`}
            dangerouslySetInnerHTML={{ __html: sanitize(data.message) }}
          />
          <span className={Styles.hwx} />
        </div>
        <div style={{ alignSelf: 'flex-end' }} className={`${Styles.meta}`}>
          <span style={{ fontSize: '10.5px' }} className={Styles.gray1}>
            {format(new Date(data.time), 'hh:mm a') || NaN}
          </span>
        </div>
      </>
    );
  }
  return (
    <div className="flex flex-row items-center justify-around">
      <div className={Styles.other_img} />
      <div style={{ fontSize: '0.9rem' }} className="font-sans mx-2">
        {data.name}
      </div>
      {data.shareID === status.shareID && status.progress !== 100 && (
        <div
          style={{ width: '29px', height: '29px', minWidth: '29px' }}
          className="mx-1"
        >
          <Circle
            percent={status.progress}
            strokeWidth="4"
            strokeColor="#00b2d2"
          />
        </div>
      )}
      <DownloadComponent status={status} data={data} />
    </div>
  );
};

function Chat({ data, uid, status }) {
  // const [emoji, setEmoji] = useState([]);
  const openTab = (e) => {
    e.preventDefault();
    const { target } = e;

    if (target.tagName === 'A') {
      const { href } = target;
      window.open(href, '_blank');
    }
  };

  return (
    <div
      className={`flex ${
        !(data.from === uid)
          ? ' justify-start m-1 ml-2 lg:ml-3'
          : 'justify-end m-1 mr-2 lg:mr-3'
      } `}
    >
      <div
        className={`${Styles.message} ${!(data.from === uid) && Styles.other}`}
      >
        <Utils data={data} openTab={openTab} uid={uid} status={status} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  status: state.peerReducer,
});

export default connect(mapStateToProps)(Chat);

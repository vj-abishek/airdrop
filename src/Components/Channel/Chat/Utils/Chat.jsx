import React from 'react';
import { format } from 'date-fns';
import DOMPurify from 'dompurify';
import marked from 'marked';
import Styles from '../../../../Styles/responsive.module.css';

marked.Renderer.prototype.paragraph = (text) => `${text}\n`;

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

const Utils = ({ data, openTab, uid }) => {
  if (/^image/gi.test(data.type)) {
    return (
      <>
        <div
          style={{
            width: '336px',
            height: '336px',
            maxWidth: '336px',
          }}
          className="font-sans"
        >
          <div
            style={{
              width: '330px',
              height: '330px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#242323',
              position: 'relative',
              maxWidth: '100%',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            <img
              style={{ borderRadius: '10px' }}
              src={data.url}
              alt={data.message}
            />
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
  return (
    <>
      <div className="font-sans">
        <span
          style={{ fontSize: '0.9rem' }}
          onClick={openTab}
          className={`${Styles.text_wrapper_sanitize} ${
            !(data.from === uid) && 'otherStyle'
          }`}
          dangerouslySetInnerHTML={{ __html: sanitize(data.message) }}
        />
        <span className={Styles.hwx} />
      </div>
      <div className={Styles.meta}>
        <span style={{ fontSize: '10.5px' }} className={Styles.gray1}>
          {format(new Date(data.time), 'hh:mm a') || NaN}
        </span>
      </div>
    </>
  );
};

export default function Chat({ data, uid }) {
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
          ? ' justify-start m-1 ml-3'
          : 'justify-end m-1 mr-3'
      } `}
    >
      <div
        className={`${Styles.message} ${!(data.from === uid) && Styles.other}`}
      >
        <Utils data={data} openTab={openTab} uid={uid} />
      </div>
    </div>
  );
}

import React from 'react';
import { format } from 'date-fns';
import DOMPurify from 'dompurify';
import { Circle } from 'rc-progress';
import marked from 'marked';
import { connect } from 'react-redux';
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

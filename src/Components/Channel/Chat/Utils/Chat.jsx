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
          ? ' justify-start m-1 ml-4'
          : 'justify-end m-1 mr-4'
      } `}
    >
      <div
        className={`${Styles.message} ${!(data.from === uid) && Styles.other}`}
      >
        <div className="font-sans ">
          <span
            onClick={openTab}
            className={`${Styles.text_wrapper_sanitize} ${
              !(data.from === uid) && 'otherStyle'
            } font-base`}
            dangerouslySetInnerHTML={{ __html: sanitize(data.message) }}
          />
          <span className={Styles.hwx} />
        </div>
        <div className={Styles.meta}>
          <span style={{ fontSize: '10.5px' }} className={Styles.gray1}>
            {format(new Date(data.time), 'HH:mm a') || NaN}
          </span>
        </div>
      </div>
    </div>
  );
}

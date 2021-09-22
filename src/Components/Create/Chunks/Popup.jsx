import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { addSlug } from '../../../Store/Actions/Firestore';
import Styles from '../../../Styles/responsive.module.css';

function Popup({ onClicks, show, add, slug, generated }) {
  const [copied, setCopy] = useState(false);

  const copyTextref = useRef(null);

  useEffect(() => {
    if (!generated && show) add();
  });

  const copyText = () => {
    if (generated) {
      const node = copyTextref.current;
      if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
        document.execCommand('copy');
        setCopy(true);
      } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        setCopy(true);
      }
    }
  };

  const Generate = () => {
    setCopy(false);
    add();
  };

  return show
    ? createPortal(
        <div
          style={{
            backgroundColor: 'rgb(0 0 0 / 70%)',
            placeItems: 'center',
          }}
          tabIndex="0"
          onClick={onClicks}
          id="popupmain"
          className="fixed outline-none z-50 top-0 grid h-screen w-screen"
        >
          <div className="w-11/12 lg:w-4/12 shadow-2xl rounded bg-secondary">
            <div className="p-3">
              <header className="flex justify-between">
                <div className="flex-1 text-white  uppercase font-sans text-md font-bold">
                  Invite friends to your room
                </div>
                <div
                  tabIndex="0"
                  role="button"
                  aria-pressed={show}
                  onKeyDown={onClicks}
                  onClick={onClicks}
                  id="closeButtons"
                >
                  <svg
                    id="closeButtons"
                    aria-hidden="false"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="text-accent"
                      fill="currentColor"
                      d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                    />
                  </svg>
                </div>
              </header>
              <div className={`mt-3 ${Styles.gray1} text-sm`}>
                Share this link with your friend to grant access to your room!
              </div>
              <div className="flex justify-evenly mt-2 p-2 rounded bg-primary">
                <div
                  onClick={copyText}
                  onKeyDown={copyText}
                  tabIndex={0}
                  role="button"
                  ref={copyTextref}
                  className="flex-1 text-white overflow-hidden"
                >
                  {generated ? `https://linlp.vercel.app/${slug}` : slug}
                </div>
                <div
                  onClick={copyText}
                  onKeyDown={copyText}
                  tabIndex={0}
                  role="button"
                  className="rounded  bg-accent text-white px-3 text-sm"
                >
                  {copied ? 'copied' : 'copy'}
                </div>
              </div>
              <div className={`${Styles.gray1} text-xs mt-1`}>
                Your invite link expires only when accepted.
              </div>
            </div>
            <div
              style={{ borderRadius: '0px 0px 0.25rem 0.25rem' }}
              className="w-full border-bottom bg-primary text-white p-4 flex justify-evenly"
            >
              <div className="flex-1">Generate another URL</div>
              <div
                onKeyDown={copyText}
                tabIndex={0}
                role="button"
                onClick={Generate}
                className="rounded-sm bg-secondary p-1 flex items-center text-white cursor-pointer px-3 text-sm"
              >
                Generate
              </div>
            </div>
          </div>
        </div>,
        document.querySelector('#popup'),
      )
    : null;
}

const mapDispatchToProps = (dispatch) => ({
  add: () => dispatch(addSlug()),
});

const mapStateToProps = (state) => ({
  slug: state.firestoreReducer.slug,
  generated: state.firestoreReducer.generated,
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);

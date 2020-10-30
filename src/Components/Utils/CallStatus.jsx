import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { dismissCall, joinCall } from '../../Store/Actions/Peer';
import Call from './Call';

const call = new Call();

function CallStatus({ callStatus, setCallStatus, jCall }) {
  const [status, setStatus] = useState('incoming call...');

  useEffect(() => {
    const handler = () => {
      setStatus('Connected');
    };
    call.on('connected', handler);

    return () => call.off('connected', handler);
  }, [status]);
  const Join = () => {
    if (call.connected) return;
    jCall();
    setStatus('Connecting...');

    call.Call(callStatus.to, callStatus.from.from);
  };
  const handleDismiss = () => {
    if (call.connected) {
      call.peer.destroy();
    }
    setCallStatus(null);
  };
  return (
    <div
      style={{
        zIndex: 999999,
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '50%',
      }}
      className="fixed p-8 bg-gray-700 shadow-2xl rounded-lg flex flex-col items-center justify-center"
    >
      <div>
        <img
          src={callStatus.from.photoURL}
          width="80"
          height="80"
          alt="Profile"
          className="rounded-full"
        />
      </div>
      <div style={{ textAlign: 'center' }} className="flex flex-col mt-1">
        <span className="text-base font-bold">
          {callStatus.from.displayName}
        </span>
        <span className="text-light text-sm">{status}</span>
      </div>
      <div className="flex flex-row mt-1 p-1">
        <div
          className="bg-red-600 rounded-full p-3"
          onClick={handleDismiss}
          role="button"
          tabIndex="0"
          onKeyDown={handleDismiss}
        >
          <svg
            className="text-white "
            aria-hidden="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
            />
          </svg>
        </div>
        {status === 'incoming call...' && (
          <div
            className="bg-green-600 rounded-full p-3 ml-3"
            onClick={Join}
            role="button"
            tabIndex="0"
            onKeyDown={() => console.log()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              className="text-white fill-current"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCallStatus: (val) => dispatch(dismissCall(val)),
  jCall: () => dispatch(joinCall()),
});

export default connect(null, mapDispatchToProps)(CallStatus);

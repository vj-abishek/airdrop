import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { use100vh } from 'react-div-100vh';
import Header from './Utils/Header';
import Styles from '../../../Styles/responsive.module.css';
import Chat from './Utils/Chat';
import Fotter from './Utils/Fotter';
import VoiceCallUI from './Utils/VoiceCall';
import { Pagnination } from '../../../Store/Actions/Message';
import {
  getCurrentChannel,
  IndicateChannel,
  InitOther,
  InitSignal,
  RecieveFile,
} from '../../../Store/Actions/Peer';

const Loader = () => (
  <div className="flex flex-row justify-center items-center ">
    <div
      className="bg-secondary p-2 rounded-full shadow-md"
      title="loading messages…"
    >
      <svg
        style={{
          animation: 'rotate 2s linear infinite',
        }}
        width="24"
        height="24"
        viewBox="0 0 46 46"
        role="status"
      >
        <circle
          style={{
            stroke: 'var(--color-accent)',
            strokeDasharray: '1,150',
            strokeDashoffset: 0,
            strokeLinecap: 'round',
            animation: 'stroke 1.5s ease-in-out infinite',
          }}
          cx="23"
          cy="23"
          r="20"
          fill="none"
          strokeWidth="6"
        ></circle>
      </svg>
    </div>
  </div>
);

function Conversation({
  message,
  uid,
  channelId,
  nextM,
  channel,
  channelReducer,
  current,
  currentChannel,
  currentStatus,
  Init,
  Signal,
  peerStatus,
  Recieve,
  isCall,
  clearMessage,
}) {
  const ChatBox = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [currentTo, setTo] = useState(null);
  const [currentRoom, setCurrentRoom] = useState('');
  // const [minHeight, setMinHeight] = useState('');

  // const height = use100vh();

  // useEffect(() => {
  //   setMinHeight(height ? height - 120 : '95vh');
  // }, [height]);

  useEffect(() => {
    if (message.get(channelId)?.messages.length && autoScroll) {
      ChatBox.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message, channelId, autoScroll]);

  useEffect(() => {
    channel(channelId, uid, false);
    return () => channel(channelId, uid, true);
  }, [channel, channelId, uid]);

  // Clear local message
  useEffect(() => {
    clearMessage(channelId, channelId);
  }, [clearMessage, channelId]);

  useEffect(() => {
    if (window.location.hash === '') {
      Init();
      Recieve();
    }
  }, [Init, Recieve]);
  useEffect(() => {
    const [to] = channelReducer.filter((id) => id.channelId === channelId);
    if (to) {
      const finalTo = to.from === uid ? to.to : to.from;
      current(finalTo);
      setTo({
        from: to.from,
        to: finalTo,
      });
    }
  }, [channelReducer, channelId, uid, current]);

  useEffect(() => {
    //Check and send offer to other peer is present
    if (currentRoom === channelId) {
      if (currentTo.from === uid && !peerStatus) {
        Signal(uid, currentTo.to);
        Recieve();
      }
    }
  }, [currentRoom, channelId, currentTo, uid, peerStatus, Signal, Recieve]);

  useEffect(() => {
    if (currentChannel && currentTo && currentStatus.has(currentTo.to)) {
      const { status } = currentStatus.get(currentTo.to);
      if (status.status === 'Online' && currentChannel === channelId) {
        setCurrentRoom(currentChannel);
      }
    }
  }, [currentChannel, currentStatus, currentTo, currentRoom, channelId]);

  const handleScroll = useCallback((e) => {
    if (e.target.scrollTop >= -36) {
      setAutoScroll(true);
    } else {
      setAutoScroll(false);
    }
  }, []);

  const handleClick = () => {
    ChatBox.current.scrollTo(0, 0);
  };

  return (
    <div className={`${Styles.conversation} relative `}>
      <Header />
      {isCall && <VoiceCallUI />}

      {message.get(channelId)?.messages.length ? (
        <div
          className={Styles.reverse}
          style={{
            maxWidth: `${window.innerWidth}px`,
          }}
          ref={ChatBox}
          onScroll={handleScroll}
          id="ChatBox"
        >
          <InfiniteScroll
            dataLength={message.get(channelId)?.messages.length}
            next={() => nextM(channelId)}
            inverse={true}
            hasMore={message.get(channelId)?.next < 0 ? false : true}
            // style={{ display: 'flex', flexDirection: 'column-reverse' }}
            loader={<Loader />}
            scrollableTarget="ChatBox"
            scrollThreshold="200px"
          >
            {message.get(channelId)?.messages.map((data, i, arr) => {
              return <Chat data={data} key={data.messageId} uid={uid} />;
            })}
          </InfiniteScroll>
        </div>
      ) : (
        <div
          className={`${Styles.chatBoxHeight} text-base flex flex-col items-center justify-center`}
        >
          {message.get(channelId)?.messages.length === 0 && (
            <div
              className="px-3 py-1"
              style={{
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-white)',
                borderRadius: '15px',
                boxShadow: '3px 5px 6px rgba(0,0,0,0.1)',
              }}
            >
              No messages here yet...
            </div>
          )}
        </div>
      )}
      {/* Follow button */}
      {!autoScroll && (
        <button onClick={handleClick} className={Styles.bottomButton}></button>
      )}

      <Fotter channelId={channelId} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    message: state.messageReducer.data,
    uid: state.authReducer.user.uid,
    channelReducer: state.channelReducer.channels,
    currentChannel: state.peerReducer.current,
    currentStatus: state.messageReducer.userStatus,
    peerStatus: state.peerReducer.connected,
    isCall: state.peerReducer.isCall,
  };
};

const mapDispatchToProps = (dispatch) => ({
  nextM: (channelId) => dispatch(Pagnination(channelId)),
  channel: (channelID, uid, status) =>
    dispatch(IndicateChannel(channelID, uid, status)),
  current: (to) => dispatch(getCurrentChannel(to)),
  Signal: (uid, to) => dispatch(InitSignal(uid, to)),
  Init: () => dispatch(InitOther()),
  Recieve: () => dispatch(RecieveFile()),
  clearMessage: (channelID) =>
    dispatch({ type: 'CLEAR_MESSAGE_COUNT', payload: { channel: channelID } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);

import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
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

function Conversation({
  message,
  uid,
  channelId,
  next,
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
}) {
  const ChatBox = useRef(null);
  const [iteration, setIteration] = useState(0);
  const [currentTo, setTo] = useState(null);
  const [currentRoom, setCurrentRoom] = useState('');

  useEffect(() => {
    channel(channelId, uid, false);
    return () => channel(channelId, uid, true);
  }, [channel, channelId, uid]);

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
        console.log('Both are in the same room');
        setCurrentRoom(currentChannel);
      }
    }
  }, [currentChannel, currentStatus, currentTo, currentRoom, channelId]);

  const handleScroll = (e) => {
    if (e.target.scrollTop < 100 && iteration > 0) {
      next(channelId);
      console.log('Sending...');
    }
    setIteration((i) => i + 1);
  };

  return (
    <div className={`${Styles.conversation} relative `}>
      <Header />
      {isCall && <VoiceCallUI />}
      <div id="ChatBox" ref={ChatBox} onScroll={handleScroll}>
        <ScrollToBottom
          scrollToEnd={{ behavior: 'smooth' }}
          className={`${Styles.Chat} pb-2`}
        >
          <div style={{ flex: '1 1 auto', minHeight: '12px' }} />

          <div>
            {message.get(channelId)?.messages &&
              message.get(channelId)?.messages.map((data, i, arr) => {
                return <Chat data={data} key={data.messageId} uid={uid} />;
              })}
          </div>
        </ScrollToBottom>
      </div>
      <Fotter channelId={channelId} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  message: state.messageReducer.data,
  uid: state.authReducer.user.uid,
  channelReducer: state.channelReducer.channels,
  currentChannel: state.peerReducer.current,
  currentStatus: state.messageReducer.userStatus,
  peerStatus: state.peerReducer.connected,
  isCall: state.peerReducer.isCall,
});

const mapDispatchToProps = (dispatch) => ({
  next: (channelId) => dispatch(Pagnination(channelId)),
  channel: (channelID, uid, status) =>
    dispatch(IndicateChannel(channelID, uid, status)),
  current: (to) => dispatch(getCurrentChannel(to)),
  Signal: (uid, to) => dispatch(InitSignal(uid, to)),
  Init: () => dispatch(InitOther()),
  Recieve: () => dispatch(RecieveFile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);

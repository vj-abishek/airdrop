import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import Header from './Utils/Header';
import Styles from '../../../Styles/responsive.module.css';
import Chat from './Utils/Chat';
import Fotter from './Utils/Fotter';
import { Pagnination } from '../../../Store/Actions/Message';
import { IndicateChannel } from '../../../Store/Actions/Peer';

function Conversation({
  message,
  uid,
  channelId,
  next,
  channel,
  channelReducer,
  currentChannel,
}) {
  const ChatBox = useRef(null);
  const [iteration, setIteration] = useState(0);

  const handleScroll = (e) => {
    if (e.target.scrollTop < 100 && iteration > 0) {
      next(channelId);
      console.log('Sending...');
    }
    setIteration((i) => i + 1);
  };

  useEffect(() => {
    if (currentChannel.has(channelId)) {
      console.log('Both are in same channel');
    }
  }, [currentChannel, channelId]);

  useEffect(() => {
    if (channelReducer.length !== 0) {
      const res = channelReducer.find((e) => e.channelId === channelId);
      if (res) {
        console.log(channelId, res);
        channel(channelId, uid, res);
      }
    }
  }, [channelId, channel, uid, channelReducer]);

  return (
    <div className={`${Styles.conversation} relative `}>
      <Header />
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    message: state.messageReducer.data,
    uid: state.authReducer.user.uid,
    channelReducer: state.channelReducer.channels,
    currentChannel: state.messageReducer.currentChannel,
  };
};

const mapDispatchToProps = (dispatch) => ({
  next: (channelId) => dispatch(Pagnination(channelId)),
  channel: (channelID, uid, res) =>
    dispatch(IndicateChannel(channelID, uid, res)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);

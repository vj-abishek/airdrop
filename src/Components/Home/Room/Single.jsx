import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { isDate } from 'date-fns';
import E2E from '../../Utils/EndToEnd';
import Styles from '../../../Styles/responsive.module.css';
import { UpdateChannel } from '../../../Store/Actions/Channel';
import LastSeen from '../../Utils/LastSeen';
import ConversationTime from '../../Utils/ConversationTime';

const MessageCount = ({ children, messageCount, title }) => (
  <div className="flex flex-row justify-between">
    <div
      className={`${messageCount > 0 && 'text-white'} ${Styles.overFLow}`}
      title={title && title}
    >
      {children}
    </div>
    <div
      className={`${Styles.messageCount} ${
        messageCount > 0 ? Styles.message_show : Styles.message_hide
      } `}
    >
      {messageCount}
    </div>
  </div>
);

const Utils = ({
  TypingIndication,
  snapShot,
  status,
  count,
  hasLastMessage,
  lastMessage,
}) => {
  const [typing, setTyping] = useState('NO_CONTENT');

  useEffect(() => {
    setTyping(TypingIndication.get(snapShot.channelId)?.other);
  }, [TypingIndication, snapShot]);

  if (typing === 'CONTENT') {
    return (
      <MessageCount messageCount={count}>
        <span style={{ fontSize: '13px' }} className="text-accent">
          typing...
        </span>
      </MessageCount>
    );
  }

  if (hasLastMessage && !(typing === 'CONTENT')) {
    const getLastMessage = lastMessage.get(snapShot.channelId);
    if (getLastMessage.message?.message !== undefined) {
      return (
        <MessageCount
          messageCount={count}
          title={getLastMessage.message?.message}
        >
          {getLastMessage.message?.message || 'Tap to chat'}
        </MessageCount>
      );
    }
  }

  if (status?.status.includes('Online')) {
    return <MessageCount messageCount={count}>Active now</MessageCount>;
  }

  if (status?.LastSeen) {
    return (
      <MessageCount messageCount={count}>
        <div className={Styles.overFLow}>
          {LastSeen(new Date(status?.LastSeen))}
        </div>
      </MessageCount>
    );
  }

  return 'Tap to chat';
};

const Single = ({
  data,
  user,
  update,
  hashTable,
  userStatus,
  TypingIndication,
  uid,
  Count,
  lastMessage,
  sidebar,
}) => {
  const { id } = useParams();

  return (
    data &&
    data.map((snapShot, i, arr) => {
      const cond = arr.length === i + 1;
      let messagecount = 0;
      let size = 0;
      if (snapShot === undefined) return '';
      const hash = hashTable.includes(snapShot.slug);
      if (snapShot.generated === false && snapShot.from === user.uid && !hash) {
        const e2e = new E2E();
        e2e
          .setPrivateKey(
            snapShot.slug,
            snapShot.channelId,
            snapShot.bobPublicKey,
          )
          .then(() => {
            update({ id: snapShot.channelId, slug: snapShot.slug });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      let status = {
        status: 'Offline',
        LastSeen: null,
      };

      if (userStatus.has(snapShot.pro.data().uid)) {
        status = userStatus.get(snapShot.pro.data().uid).status;
      }

      size = Count.size;

      if (Count.has(snapShot.channelId)) {
        messagecount = Count.get(snapShot.channelId).messageCount;
      }

      if (size > 0 && 'setAppBadge' in navigator) {
        navigator.setAppBadge(size).catch((error) => {
          console.log('error:', error);
        });
      }

      let lastMessagetime = null;
      const hasLastMessage = lastMessage.has(snapShot.channelId);

      if (hasLastMessage) {
        const message = lastMessage.get(snapShot.channelId);
        lastMessagetime = message.message?.time;
      }

      const isdate = isDate(new Date(lastMessagetime));
      const date = new Date(lastMessagetime);

      const checkDate =
        lastMessagetime !== undefined && isdate && date !== 'Invalid Date';

      return (
        <Link
          to={`/r/${snapShot.channelId}/${
            snapShot.from === uid ? '#init' : ''
          }`}
          key={snapShot.channelId}
        >
          {size > 0 ? (
            <Helmet>
              <title>{`(${size}) Relp`}</title>
            </Helmet>
          ) : (
            <Helmet>
              <title>Relp</title>
            </Helmet>
          )}
          <div
            className={`grid ${
              Styles.grid7
            } gap-1 cursor-pointer pr-4 hover:bg-dark focus:bg-primary ${
              id === snapShot.channelId && 'bg-dark'
            }
            `}
          >
            <div className="px-3 flex items-center ">
              <div className="bg-secondary rounded-full relative">
                <img
                  src={snapShot.pro.data().photoURL}
                  className="rounded-full "
                  alt="Yourfile"
                  draggable="false"
                />
                {status?.status.includes('Online') && (
                  <div
                    style={{
                      width: '13px',
                      height: '13px',
                      border: '2px solid #000',
                    }}
                    title="Online"
                    className="rounded-full absolute bottom-0 right-0 bg-accent"
                  />
                )}
              </div>
            </div>
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              className={`w-auto font-sans flex flex-col py-3 justify-between ${
                !cond && Styles.borderBorder
              }`}
            >
              <div
                className={`text-white text-lg ${Styles.overFLow} flex justify-between`}
              >
                <div className={Styles.overFLow}>
                  <span>{snapShot.pro.data().isAnonymous && '~ '}</span>
                  <span>{snapShot.pro.data().displayName}</span>
                </div>
                <div className={`${Styles.gray1} text-xs`}>
                  {(hasLastMessage &&
                    checkDate &&
                    isdate &&
                    ConversationTime(new Date(lastMessagetime))) ||
                    ''}
                </div>
              </div>
              <div
                style={{
                  fontSize: '14px',
                }}
                className={Styles.gray1}
              >
                <Utils
                  snapShot={snapShot}
                  TypingIndication={TypingIndication}
                  status={status}
                  count={messagecount}
                  lastMessage={lastMessage}
                  hasLastMessage={hasLastMessage}
                />
              </div>
            </div>
          </div>
        </Link>
      );
    })
  );
};

const mapDispatchToProps = (dispatch) => ({
  update: (id) => dispatch(UpdateChannel(id)),
});

const mapStateToProps = (state) => ({
  hashTable: state.channelReducer.visited,
  TypingIndication: state.messageReducer.data,
  uid: state.authReducer.user.uid,
  Count: state.messageReducer.messageCount,
  lastMessage: state.messageReducer.lastMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(Single);

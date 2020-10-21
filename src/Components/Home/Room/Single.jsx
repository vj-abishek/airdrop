import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import E2E from '../../Utils/EndToEnd';
import Styles from '../../../Styles/responsive.module.css';
import { UpdateChannel } from '../../../Store/Actions/Channel';

const Utils = ({ TypingIndication, snapShot, status }) => {
  const [typing, setTyping] = useState('NO_CONTENT');

  useEffect(() => {
    setTyping(TypingIndication.get(snapShot.channelId)?.other);
  }, [TypingIndication, snapShot]);

  if (typing === 'CONTENT')
    return (
      <span style={{ fontSize: '13px' }} className="text-accent">
        typing...
      </span>
    );
  else if (status?.status.includes('Online')) return 'Active now';
  else {
    if (status?.LastSeen)
      return `Active ${formatDistanceToNow(status.LastSeen, {
        addSuffix: true,
      })}`;
    else return 'Tap to chat';
  }
};

const Single = ({
  data,
  user,
  update,
  hashTable,
  userStatus,
  TypingIndication,
  uid,
}) => {
  const { id } = useParams();

  return (
    data &&
    data.map((snapShot, i, arr) => {
      const cond = arr.length === i + 1;
      if (snapShot === undefined) return '';
      const hash = hashTable.includes(snapShot.slug);
      if (snapShot.generated === false && snapShot.from === user.uid && !hash) {
        console.log(snapShot.bobPublicKey);
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

      return (
        <Link
          to={`/r/${snapShot.channelId}/${
            snapShot.from === uid ? '#init' : ''
          }`}
          key={snapShot.channelId}
        >
          <div
            className={`grid ${
              Styles.grid7
            } gap-1 cursor-pointer pr-4 hover:bg-secondary focus:bg-primary ${
              id === snapShot.channelId && 'bg-secondary'
            }`}
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
              <div className={`text-white text-lg ${Styles.overFLow}`}>
                <span>{snapShot.pro.data().isAnonymous && '~ '}</span>
                <span>{snapShot.pro.data().displayName}</span>
              </div>
              <div className={`${Styles.gray1} text-xs`}>
                <Utils
                  snapShot={snapShot}
                  TypingIndication={TypingIndication}
                  status={status}
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    hashTable: state.channelReducer.visited,
    TypingIndication: state.messageReducer.data,
    uid: state.authReducer.user.uid,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Single);

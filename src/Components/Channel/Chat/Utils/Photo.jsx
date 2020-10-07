import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Styles from '../../../../Styles/responsive.module.css';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const Utils = ({ TypingIndication, id, status }) => {
  const [typing, setTyping] = useState('NO_CONTENT');

  useEffect(() => {
    setTyping(TypingIndication.get(id)?.other);
  }, [TypingIndication, id]);

  if (typing === 'CONTENT') return 'typing...';
  else if (status?.status.includes('Online')) return 'Active now';
  else {
    if (status?.LastSeen)
      return `Active ${formatDistanceToNow(status.LastSeen, {
        addSuffix: true,
      })}`;
    else return '';
  }
};

const Photo = ({ user, Ustatus, TypingIndication }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [status, setStatus] = useState();

  useEffect(() => {
    try {
      const u = user.filter((channel) => channel.channelId === id);
      setData(u[0]?.pro?.data());
    } catch (err) {
      console.log(err);
    }
  }, [user, id]);

  useEffect(() => {
    setStatus(Ustatus.get(data?.uid)?.status);
  }, [Ustatus, data]);

  return (
    <div className="flex justify-between px-1 relative">
      {data?.photoURL && (
        <>
          <div
            style={{ width: '40px', height: '40px', alignSelf: 'center' }}
            className="bg-secondary flex flex-col justify-center rounded-full relative"
          >
            <img
              src={data?.photoURL}
              className="rounded-full w-10 h-10 p-1"
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
        </>
      )}

      <div
        className={`pl-3 text-white text-base justify-center font-bold flex flex-col ${Styles.overFLow}`}
      >
        <span>
          {data?.isAnonymous && '~'}
          {data?.displayName}
        </span>
        <span className={`${Styles.gray1} text-xs font-normal`}>
          <Utils id={id} TypingIndication={TypingIndication} status={status} />
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.channelReducer.channels,
    Ustatus: state.messageReducer.userStatus,
    TypingIndication: state.messageReducer.data,
  };
};

export default connect(mapStateToProps)(Photo);

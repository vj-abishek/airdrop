import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Styles from '../../../../Styles/responsive.module.css';
import { useParams } from 'react-router-dom';
import LastSeen from '../../../Utils/LastSeen';

const Utils = ({ TypingIndication, id, status }) => {
  const [typing, setTyping] = useState('NO_CONTENT');

  useEffect(() => {
    setTyping(TypingIndication.get(id)?.other);
  }, [TypingIndication, id]);

  if (typing === 'CONTENT') return 'typing...';
  if (status?.status.includes('Online')) return 'Active now';
  if (status?.LastSeen)
    return (
      <div className={Styles.overFLow}>
        {LastSeen(new Date(status?.LastSeen))}
      </div>
    );

  return '';
};

const Photo = ({ user, Ustatus, TypingIndication, peerStatus }) => {
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
                  transition: 'all 1s',
                }}
                title="Online"
                className={`rounded-full absolute bottom-0 right-0 ${
                  peerStatus ? 'bg-purple-600' : 'bg-accent'
                } `}
              />
            )}
          </div>
        </>
      )}

      {/* 
      * Used 170 because 56+44+12+12+40+6 = 170
      * Where 56 44 40 are size of elements in chat header and 
        12 12 is padding around
       */}
      <div
        style={{
          maxWidth: `${window.innerWidth - 170}px`,
          transition: 'all 0.25s ease',
        }}
        className={`pl-3 text-white text-base justify-center font-bold flex flex-col ${Styles.overFLow}`}
      >
        <span className={Styles.overFLow}>
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

const mapStateToProps = (state) => ({
  user: state.channelReducer.channels,
  Ustatus: state.messageReducer.userStatus,
  TypingIndication: state.messageReducer.data,
  peerStatus: state.peerReducer.connected,
});

export default connect(mapStateToProps)(Photo);

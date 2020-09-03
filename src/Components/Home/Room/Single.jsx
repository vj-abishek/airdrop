import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Styles from '../../../Styles/responsive.module.css';

export const Single = ({ data }) => {
  const { id } = useParams();

  return (
    data &&
    data.map((snapShot, i, arr) => {
      if (snapShot === undefined) return '';
      const cond = arr.length === i + 1;
      return (
        <Link to={`/room/${snapShot.id}`} key={snapShot.id}>
          <div
            className={`grid ${
              Styles.grid7
            } gap-1 cursor-pointer pr-4 hover:bg-secondary focus:bg-primary ${
              id === snapShot.id && 'bg-secondary'
            }`}
          >
            <div className="px-3 flex items-center">
              <div className="bg-secondary rounded-full ">
                <img
                  src={snapShot.data().photoURL}
                  className="rounded-full "
                  alt="Your Profile"
                  draggable="false"
                />
              </div>
            </div>
            <div
              className={`w-auto font-sans flex flex-col py-3 justify-between ${
                !cond && Styles.borderBorder
              }`}
            >
              <div className={`text-white text-lg ${Styles.overFLow}`}>
                <span>{snapShot.data().isAnonymous && '~ '}</span>
                <span>{snapShot.data().name}</span>
              </div>
              <div className={`${Styles.gray1} text-xs`}>Tap to chat</div>
            </div>
          </div>
        </Link>
      );
    })
  );
};

export default Single;

import React from 'react';

export const Single = ({ data }) =>
  data &&
  data.map((snapShot) => (
    <div
      key={snapShot.id}
      style={{ gridTemplateColumns: '60px 1fr' }}
      className="grid p-3 gap-1"
    >
      <div className="w-12 h-12 bg-secondary rounded-full">
        <img
          src={snapShot.data().photoURL}
          className="rounded-full"
          alt="Your Profile"
        />
      </div>
      <div className="w-auto font-sans flex flex-col justify-between borderBorder pb-2">
        <div className="text-white text-lg">
          <span>{snapShot.data().isAnonymous && '~ '}</span>
          <span>{snapShot.data().name}</span>
        </div>
        <div className="text-light text-xs">Last login</div>
      </div>
    </div>
  ));

export default Single;

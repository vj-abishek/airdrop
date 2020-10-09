import React from 'react';
import error from '../../img/download.png';

export default function FNf() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-white flex-col lg:col-span-2 lg:w-auto">
      <img src={error} className="w-56 h-56  m-4 " alt="404 page not found" />
      <h4 className=" text-gray-900">This page is&rsquo; nt avaliable.</h4>
      <p style={{ textAlign: 'center' }}>
        The URL is broke or must be removed from our server.. That&rsquo;s all
        we know.
      </p>
    </div>
  );
}

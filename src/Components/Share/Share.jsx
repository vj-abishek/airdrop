import React from 'react';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.onmessage = (e) => {
    const localFile = e.data.file;
    alert(localFile, "I'm from share");
  };
}

export default function Share() {
  return <h6>This is your image</h6>;
}

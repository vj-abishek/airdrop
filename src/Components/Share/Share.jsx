import React, { useEffect, useState } from 'react';

export default function Share() {
  const [text, setText] = useState();
  useEffect(() => {
    navigator.serviceWorker.onmessage = (e) => {
      const localFile = e.data.file;
      console.log(localFile);
      setText('Success in file');
    };
  }, [text]);
  return (
    <h6 style={{ textAlign: 'center' }}>This is the sharing option{text}</h6>
  );
}

import React, { useEffect, useState } from 'react'

export default function Share() {
  const [text, setText] = useState()
  useEffect(() => {
    navigator.serviceWorker.onmessage = (e) => {
      console.log(e.data.file)
      setText('Success in file')
    }
    const parsedUrl = new URL(window.location)
    // searchParams.get() will properly handle decoding the values.
    console.log('Title shared: ' + parsedUrl.searchParams.get('title'))
    console.log('Text shared: ' + parsedUrl.searchParams.get('text'))
    console.log('URL shared: ' + parsedUrl.searchParams.get('url'))
    setText(parsedUrl.searchParams.get('text'))
  }, [])
  return <div>{text}</div>
}

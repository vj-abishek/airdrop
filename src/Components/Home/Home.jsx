import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Section from '../Section';
import Article from '../Section/Article';
import Footer from '../Footer';
import Prompt from '../Prompt/Prompt';
import Howto from '../Howto/Howto';
import Toast from '../Alert/Toast';

export default function Home() {
  const [trigger, setTrigger] = useState(false);
  const [updateHappen, setUpdateHappen] = useState(false);
  const [prompt, setPrompt] = useState();

  //listen for update event from the service worker
  useEffect(() => {
    const messages = (e) => {
      console.log(e);
      console.log('Update happen,testing..');
      setUpdateHappen(true);
    };

    if (navigator.serviceWorker) {
      navigator.serviceWorker.ready.then((da) => {
        da.onupdatefound = messages;
      });
    }
    // navigator.serviceWorker.onmessage = messages
  }, [updateHappen]);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setPrompt(e);
      // Update UI notify the user they can install the PWA
      setTrigger(true);
    });
  }, [trigger]);

  const HandleClick = () => {
    // Hide the app provided install promotion
    setTrigger(false);
    // Show the install prompt
    prompt.prompt();
    // Wait for the user to respond to the prompt
    prompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  const handleCancel = () => setTrigger(false);
  return (
    <div>
      <Header />
      {updateHappen && <Toast />}
      <Section />
      <Article />
      <Howto />
      {trigger && <Prompt handleClick={HandleClick} Cancel={handleCancel} />}
      <Footer />
    </div>
  );
}

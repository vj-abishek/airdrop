import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Toggle from './ToggleButtons';
import firebase from '../../config/fb';
import db from '../Channel/Chat/Utils/Settings.model';
import 'firebase/messaging';
import socket from '../Functions/Users';

let messaging;
let errorInMessaing;
try {
  messaging = firebase.messaging();
} catch (err) {
  console.log(err);
  errorInMessaing = true;
}

function Section({ handleErr, handleSuccess, uid }) {
  const [checked, setChecked] = useState(false);
  const [hasInDb, setHasInDb] = useState(false);
  const [notificationInDb, setNotificationInDB] = useState(null);

  useEffect(() => {
    async function effect() {
      if (Notification.permission === 'granted') {
        setChecked((c) => !c);
        if (notificationInDb === false) {
          const token = await messaging.getToken();
          console.log(token);
          if (hasInDb) {
            await db.uid.update(uid, {
              notification: true,
            });
          } else {
            db.uid
              .add({
                id: uid,
                notification: true,
              })
              .catch((err) => console.log(err));
          }
          socket.emit('notification token', { uid, token });
          setChecked(true);
        }
      }
    }
    effect();
  }, [notificationInDb, handleSuccess, hasInDb, uid]);

  useEffect(() => {
    async function effect() {
      try {
        const result = await db.uid.where('id').equalsIgnoreCase(uid).toArray();

        if (result.length === 1 && result[0].notification) {
          setNotificationInDB(result[0].notification);
          setHasInDb(true);
          return;
        }
        if (result.length === 1 && result[0].notification === undefined) {
          setNotificationInDB(false);
          setHasInDb(true);
          return;
        }

        setNotificationInDB(false);
      } catch (err) {
        console.log(err);
        setNotificationInDB(false);
      }
    }
    effect();
  }, [hasInDb, notificationInDb, uid]);

  useEffect(() => {
    // Code to get refresh Token
    if (errorInMessaing) return;
    messaging.onTokenRefresh(() => {
      messaging
        .getToken()
        .then((refreshedToken) => {
          socket.emit('notification token', { uid, refreshedToken });
        })
        .catch((err) => {
          console.log('Unable to retrieve refreshed token ', err);
          handleErr(`Unable to retrieve refreshed token. ${err}`);
        });
    });
  }, [handleErr, uid]);

  const Change = async () => {
    if (checked) return;

    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
      handleErr('This browser does not support desktop notification');
      return;
    }

    setChecked(!checked);

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        handleSuccess('Notifications Enabled 🥳🥳');
        const token = await messaging.getToken();
        console.log(token);
        if (hasInDb) {
          await db.uid.update(uid, {
            id: uid,
            notification: true,
          });
        } else {
          db.uid
            .add({
              id: uid,
              notification: true,
            })
            .catch((err) => console.log(err));
        }
        socket.emit('notification token', { uid, token });
      }

      if (permission === 'denied') {
        handleErr('InCase, you want to enable notifications. Go to settings. ');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Toggle handleChange={Change} checked={checked}>
      <div className="w-12 h-12 text-white flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current w-7 h-7"
          height="24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16z" />
        </svg>
      </div>
      <div className="w-auto font-sans p-3">
        <div className="text-white text-lg">
          <span>Notifications</span>
        </div>
      </div>
    </Toggle>
  );
}

const mapStateToProps = (state) => ({
  uid: state.authReducer.user.uid,
});

const mapDispatchToProps = (dispatch) => ({
  handleErr: (message) =>
    dispatch({ type: 'GENERAL_ERROR', payload: { message } }),
  handleSuccess: (message) =>
    dispatch({ type: 'GENERAL_SUCCESS', payload: { message } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);

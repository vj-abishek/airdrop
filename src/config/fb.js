import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'abigo-share.firebaseapp.com',
  databaseURL: 'https://abigo-share.firebaseio.com',
  projectId: 'abigo-share',
  storageBucket: 'abigo-share.appspot.com',
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASURMENT_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

if (process.env.NODE_ENV === 'production') {
  firebase.analytics();

  firebase.firestore().enablePersistence()
    .catch(console.error);

}

export default firebase;

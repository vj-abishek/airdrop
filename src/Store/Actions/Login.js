import { nanoid } from 'nanoid';
import firebase from '../../config/fb';
import 'firebase/auth';
import 'firebase/firestore';

const GuestPhoto = 'https://firebasestorage.googleapis.com/v0/b/abigo-share.appspot.com/o/Guest%20(1).jpg?alt=media&token=3e3fb84b-eec0-40a4-97e6-354a408b9c66';

// Check and add to the Database

const check = (user, object, dispatch, guest) => {
  const db = firebase.firestore();
  db.collection('users')
    .doc(user.uid)
    .get()
    .then((u) => {
      if (u.exists) {
        dispatch({ type: 'LOGIN_SUCCESS', user });
        console.log('User Exists...');
      } else {
        dispatch({ type: 'ADDED_USER', user });
        db.collection('users')
          .doc(user.uid)
          .set(object)
          .then(() => {
            console.log('Added the user');
            if (guest) {
              console.log(user);
              firebase.auth().currentUser.updateProfile({
                displayName: object.name,
                photoURL: GuestPhoto,
              }).then(() => {
                console.log('Success');
                dispatch({ type: 'LOGIN_SUCCESS_GUEST', user });
              }).catch((err) => {
                console.error(err);
                dispatch({ type: 'LOGIN_ERROR', err });
              });
            } else {
              dispatch({ type: 'LOGIN_SUCCESS', user });
            }
          })
          .catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
          });
      }
    })
    .catch((err) => console.log(err));
};

// Used to login every provider

const loginFunc = (provider, dispatch) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const { user } = result;
      console.log(user, token);
      const object = {
        name: user.displayName,
        email: user.email,
        token,
        isAnonymous: user.isAnonymous,
        photoURL: user.photoURL,
        uid: user.uid,
        joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      check(user, object, dispatch, false);
      // ...
    })
    .catch((error) => {
      dispatch({ type: 'LOGIN_ERROR', error });
      console.log(error);
      // ...
    });
};

const google = () => (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  loginFunc(provider, dispatch);
};

const github = () => (dispatch) => {
  const provider = new firebase.auth.GithubAuthProvider();
  loginFunc(provider, dispatch);
};

const facebook = () => (dispatch) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  loginFunc(provider, dispatch);
};

const guest = () => (dispatch) => {
  firebase
    .auth()
    .signInAnonymously()
    .then((result) => {
      const { user } = result;
      const name = `G-${nanoid(5)}`;
      const object = {
        uid: user.uid,
        name,
        isAnonymous: user.isAnonymous,
        photoURL: GuestPhoto,
        joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      // Add the user to the database if not exits
      check(user, object, dispatch, true);
    })
    .catch((error) => {
      // Handle Errors here.
      dispatch({ type: 'LOGIN_ERROR', error });
      // ...
    });
};

const userState = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('STATE_CHANGED:', user);
      dispatch({ type: 'LOGIN_SUCCESS_STATE', user });
    } else {
      // No user is signed is
      dispatch({ type: 'NOT_LOGIN', user });
    }
  });
};
export {
  google, github, facebook, guest, userState,
};

import { nanoid } from 'nanoid';
import firebase from '../../config/fb';
import 'firebase/auth';

const photo1 = 'https://firebasestorage.googleapis.com/v0/b/abigo-share.appspot.com/o/1cbd08c76f8af6dddce02c5138971129.png?alt=media&token=6d549fa7-4e5a-457b-9f0e-09773b3bd634';
const photh2 = 'https://firebasestorage.googleapis.com/v0/b/abigo-share.appspot.com/o/322c936a8c8be1b803cd94861bdfa868.png?alt=media&token=81205467-68f1-4140-8796-e302adee78c8';

const db = firebase.firestore();

// Check and add to the Database

const check = (user, object, dispatch, guest) => {
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
              firebase
                .auth()
                .currentUser.updateProfile({
                  displayName: object.displayName,
                  photoURL: object.photoURL,
                })
                .then(() => {
                  dispatch({ type: 'LOGIN_SUCCESS_GUEST', user });
                })
                .catch((err) => {
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
        displayName: user.displayName,
        email: user.email,
        token,
        isAnonymous: user.isAnonymous,
        photoURL: user.photoURL,
        uid: user.uid,
        joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      dispatch({ type: 'LOGIN_WAITING', user });

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
      dispatch({ type: 'LOGIN_WAITING' });
      const { user } = result;
      const name = `G-${nanoid(5)}`;
      const photoURL = Math.floor(Math.random() * 2) === 0 ? photo1 : photh2;
      const object = {
        uid: user.uid,
        displayName: name,
        isAnonymous: user.isAnonymous,
        photoURL,
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

const userState = () => (dispatch, getState) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('%c STATE_CHANGED:', ' color: #00b2d2', user);
      if (!getState().authReducer.waiting) {
        dispatch({ type: 'LOGIN_SUCCESS_STATE', user });
      }
    } else {
      // No user is signed is
      dispatch({ type: 'NOT_LOGIN', user });
    }
  });
};

const sentNotification = () => (dispatch) => {
  dispatch({ type: 'SEND_NOTIFICATION' });
};

const logout = () => (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: 'LOGOUT' });
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      dispatch({ type: 'LOGOUT_ERROR', error });
    });
};

const updateProfile = (data, uid) => async (dispatch) => {
  console.log(uid);
  try {
    const user = await db.collection('users').doc(uid.uid).get();
    if (user.exists) {
      await db.collection('users').doc(uid.uid).update(data);
      await firebase.auth().currentUser.updateProfile({
        displayName: data.displayName,
        photoURL: data.photoURL,
      });
    }
    dispatch({ type: 'UPDATE_SUCCESS' });
  } catch (err) {
    console.log(err);
    dispatch({ type: 'UPDATE_FAILED', err });
  }
};

export {
  google, github, facebook, guest, userState, logout, sentNotification, updateProfile,
};

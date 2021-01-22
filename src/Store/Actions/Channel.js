import firebase from '../../config/fb';
import socket from '../../Components/Functions/Users';

const db = firebase.firestore();

const fetchProfile = (
  id,
  dispatch,
  channelId,
  bobPublicKey,
  generated,
  from,
  slug,
  to,
) => {
  db.collection('users')
    .where('uid', '==', id)
    .get()
    .then((profile) => {
      if (profile.empty) {
        dispatch({ type: 'FETCH_EMPTY' });
      }

      if (profile.docs[0] === undefined) {
        dispatch({ type: 'FETCH_EMPTY' });
        console.log(profile.docs[0]);
      } else {
        const final = {
          pro: profile.docs[0],
          channelId,
          bobPublicKey,
          generated,
          from,
          slug,
          to,
        };
        dispatch({ type: 'FETCH_SUCCESS', payload: { pro: final } });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: 'FETCH_ERROR', payload: err });
    });
};

export const Fetch = () => (dispatch, getState) => {
  const { uid } = getState().authReducer.user;

  db.collection('channel')
    .where('both', 'array-contains', uid)
    .get()
    .then((data) => {
      if (data.empty) {
        dispatch({ type: 'FETCH_EMPTY' });
      }
      data.docs.forEach((value) => {
        const id = value.data().both.find((i) => i !== uid);
        const channelId = value.id;
        const {
          bobPublicKey, generated, from, slug, to,
        } = value.data();
        fetchProfile(
          id,
          dispatch,
          channelId,
          bobPublicKey,
          generated,
          from,
          slug,
          to,
        );
        socket.emit('fetch status', { id, from: uid });
      });
    });
};

export const UpdateChannel = (data) => async (dispatch, getState) => {
  const { visited } = getState().channelReducer;
  const hash = visited.includes(data.slug);
  if (hash) return;
  try {
    if (!hash) {
      await db.collection('channel').doc(data.id).update({
        generated: true,
        bobPublicKey: '',
      });
      dispatch({ type: 'SUCCESS_IN_UPDATE', payload: { slug: data.slug } });
    }
  } catch (err) {
    console.log(err);
  }
};

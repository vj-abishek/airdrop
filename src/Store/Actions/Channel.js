import firebase from '../../config/fb';
import 'firebase/firestore';

const db = firebase.firestore();

const fetchProfile = (id, dispatch) => {
    db.collection('users')
        .where('uid', '==', id)
        .get()
        .then((profile) => {
            if (profile.empty) return;
            dispatch({ type: 'FETCH_SUCCESS', payload: { pro: profile.docs[0] } });
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
        .limit(5)
        .onSnapshot((data) => {
            if (data.empty) {
                dispatch({ type: 'FETCH_EMPTY' })
            };
            data.docs.forEach((value) => {
                const id = value.data().both.filter((i) => i !== uid);
                fetchProfile(id[0], dispatch);
            });
        });
};

export const nothing = '';

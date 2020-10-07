import SimplePeerFiles from 'simple-peer-files';
import socket from '../../Components/Functions/Users';

const spf = new SimplePeerFiles();

const getId = (channelID, state, res = null) => {
    const { uid } = state().authReducer.user;
    if (res) {
        const to = res.from === uid ? res.to : res.from;
        console.log(to);
        return to;
    }
    const [to] = state()
        .channelReducer
        .channels
        .filter((id) => id.channelId === channelID);
    const finalTo = to.from === uid ? to.to : to.from;
    return finalTo;
};

export const RecieveFiles = (Peer) => (dispatch, getState) => {
    const { shareID } = getState().peerReducer;
    console.log(shareID);
    spf.receive(Peer, shareID).then((transfer) => {
        transfer.on('progress', (sentBytes) => {
            console.log(sentBytes);
        });
    });
};

export const SendFiles = (shareID, channelID) => (dispatch, getState) => {
    const finalTo = getId(channelID, getState);
    if (finalTo) {
        socket.emit('shareID', { shareID, finalTo });
    }
};

export const IndicateChannel = (channelID, uid, res) => (dispatch, getState) => {
    const to = getId(channelID, getState, res);
    if (to) {
        dispatch({ type: 'INDICATE_CHANNEL', payload: { channelID, uid } });
        socket.emit('current channel', { channelID, uid, to });
    }
};

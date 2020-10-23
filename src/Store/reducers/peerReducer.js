const initialState = {
  connected: false,
  shareID: null,
  current: null,
  err: null,
  progress: 100,
  type: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'PEER_CONNECTED':
      return {
        ...state,
        connected: payload,
      };
    case 'SET_SHAREID':
      return {
        ...state,
        shareID: payload,
      };
    case 'CURRENT_CHANNEL':
      return {
        ...state,
        current: payload.res,
      };
    case 'PROGRESS':
      return {
        ...state,
        shareID: payload.shareID,
        progress: payload.sentBytes,
      };
    case 'SHOW_PLACEHOLDER':
      return {
        ...state,
        type: payload.type,
      };
    case 'ERROR_WHILE_SENDING':
      return {
        ...state,
        err: payload,
      };
    default:
      return state;
  }
};

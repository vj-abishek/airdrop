const initialState = {
  connected: false,
  shareID: null,
  current: null,
  err: null,
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
    case 'ERROR_WHILE_SENDING':
      return {
        ...state,
        err: payload,
      };
    default:
      return state;
  }
};

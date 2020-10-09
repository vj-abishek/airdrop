const initialState = {
  connected: false,
  shareID: null,
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
    default:
      return state;
  }
};

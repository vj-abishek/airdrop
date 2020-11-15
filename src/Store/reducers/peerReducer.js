const initialState = {
  connected: false,
  shareID: null,
  current: null,
  err: null,
  progress: 100,
  type: null,
  isCall: false,
  callStatus: null,
  qrCodeData: {},
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
    case 'SET_VOICE_CALL':
      return {
        ...state,
        isCall: payload,
      };
    case 'YOU_HAVE_CALL':
      return {
        ...state,
        callStatus: payload,
      };
    case 'DISMISS_CALL':
      return {
        ...state,
        callStatus: null,
        isCall: false,
      };
    case 'ERROR_WHILE_SENDING':
      return {
        ...state,
        err: payload,
      };
    case 'QRCODE':
      return {
        ...state,
        qrCodeData: { ...payload },
      };
    default:
      return state;
  }
};

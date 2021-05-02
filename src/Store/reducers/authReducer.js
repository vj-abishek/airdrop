const init = {
  authenticated: false,
  isGuest: false,
  isnewUser: false,
  isLoading: false,
  isLoginLoading: true,
  notified: false,
  error: null,
  waiting: false,
  user: null,
  updated_error: null,
};

const authReducer = (state = init, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authenticated: true,
        user: action.user,
        waiting: false,
        isLoading: false,
      };

    case 'LOGIN_SUCCESS_STATE':
      return {
        ...state,
        authenticated: true,
        user: action.user,
        waiting: false,
        isLoginLoading: false,
      };

    case 'LOGIN_WAITING':
      return {
        ...state,
        authenticated: false,
        waiting: true,
        user: action.user,
        isLoading: true,
      };

    case 'LOGIN_ERROR':
      return {
        ...state,
        error: action.error,
        authenticated: false,
        isLoginLoading: false,
      };
    case 'LOGIN_SUCCESS_GUEST':
      return {
        ...state,
        isGuest: true,
        authenticated: true,
        isLoginLoading: false,
      };
    case 'ADDED_USER':
      return {
        ...state,
        isnewUser: true,
        isLoading: true,
        waiting: true,
        user: action.user,
      };

    case 'NOT_LOGIN':
      return {
        ...state,
        authenticated: false,
        user: action.user,
        isLoginLoading: false,
      };

    case 'SEND_NOTIFICATION':
      return {
        ...state,
        notified: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        authenticated: false,
        user: null,
        isLoading: false,
      };
    case 'LOGOUT_ERROR':
      return {
        ...state,
        error: action.error,
      };

    case 'UPDATE_FAILED':
      return {
        ...state,
        updated_error: action.err,
      };
    default:
      return state;
  }
};

export default authReducer;

const init = {
  authenticated: false,
  isGuest: false,
  isnewUser: false,
  isLoading: false,
  isLoginLoading: true,
  error: null,
};

const authReducer = (state = init, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authenticated: true,
        user: action.user,
        isLoading: false,
      };

    case 'LOGIN_SUCCESS_STATE':
      return {
        ...state,
        authenticated: true,
        user: action.user,
        isLoginLoading: false,
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
      };

    case 'NOT_LOGIN':
      return {
        ...state,
        authenticated: false,
        user: action.user,
        isLoginLoading: false,
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
    default:
      return state;
  }
};

export default authReducer;

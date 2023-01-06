export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS
  };
}

function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// logs the user out
export function logoutUser() {
  return (dispatch) => {
    console.log('logout');
    dispatch(requestLogout());
    localStorage.removeItem("access_token");
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
  return (dispatch) => {
    dispatch(receiveLogin());
    if (creds.access_token.length > 0 ) {
      console.log('creds.access_token', creds.access_token);
      localStorage.setItem('access_token', creds.access_token)

    } else {
      dispatch(loginError('Something was wrong. Try again'));
    }
  }
}


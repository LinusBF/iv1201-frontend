import {LOGGED_IN, LOGGED_IN_STATUS, LOGGED_OUT} from './actionTypes';

export const login = content => ({
  type: LOGGED_IN,
  payload: {
    loggedIn: true,
    idToken: content.idToken,
    uid: content.uid,
    userStatus: content.userStatus,
  },
});

export const logout = () => ({
  type: LOGGED_OUT,
  payload: {loggedIn: false, idToken: null, uid: null},
});

export const setLoginStatus = content => ({
  type: LOGGED_IN_STATUS,
  payload: {userStatus: content},
});

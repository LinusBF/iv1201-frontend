import {LOGGED_IN} from './actionTypes';
import {LOGGED_OUT} from './actionTypes';

export const login = content => ({
  type: LOGGED_IN,
  payload: {loggedIn: true, idToken: content},
});

export const logout = () => ({
  type: LOGGED_OUT,
  payload: {loggedIn: false, idToken: null},
});

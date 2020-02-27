import {LOGGED_IN, LOGGED_OUT} from '../actionTypes';

const initialState = {loggedIn: false};

// eslint-disable-next-line no-unused-vars
export default function(state = initialState, action) {
  if (action.payload === undefined) return state;
  switch (action.type) {
    case LOGGED_IN: {
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        idToken: action.payload.idToken,
        uid: action.payload.uid,
      };
    }
    case LOGGED_OUT: {
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        idToken: null,
        uid: null,
      };
    }
  }
}

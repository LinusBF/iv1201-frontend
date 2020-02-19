const initialState = {login: false};

// eslint-disable-next-line no-unused-vars
export default function(state = initialState, action) {
  return {
    ...state,
    login: action.login,
  };
}

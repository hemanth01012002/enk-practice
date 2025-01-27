import { LOGIN, USERPAGE } from './authActions';

const initialState = {
  username: null, 
};

const actionHandlers = {
  [LOGIN]: (state, action) => ({
    ...state,
    username: action.payload,
  }),
  [USERPAGE]: (state) => ({
    ...state,
    username: null,
  }),
};

const authReducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};

export default authReducer;

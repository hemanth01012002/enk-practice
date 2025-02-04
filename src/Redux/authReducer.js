// Redux auth slice (authSlice.js)
const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload, // Optionally store user details
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;

export const login = (username) => ({
  type: 'LOGIN',
  payload: { username },
});

export const logout = () => ({
  type: 'LOGOUT',
});

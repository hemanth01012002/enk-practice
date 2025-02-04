export const LOGIN = 'LOGIN';
export const USERPAGE = 'USERPAGE';

export const login = (username) => ({
  type: LOGIN,
  payload: username,
});

export const userpage = () => ({
  type: USERPAGE,
});

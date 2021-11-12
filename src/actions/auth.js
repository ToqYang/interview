import { types } from "../types/types";

export const login = (user, accessToken) => {
  return {
    type: types.login,
    payload: {
      user,
      accessToken,
    },
  };
};

export const logout = () => {
  return {
    type: types.logout,
  };
};

import { types } from "../types/types";

const initialState = {
  user: {
    id: "",
    name: "",
  },
  accessToken: "",
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action?.type) {
    case types.login:
      return {
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        isAuthenticated: action.payload.isAuthenticated,
      };
    case types.logout:
      return {};
    default:
      return state;
  }
};

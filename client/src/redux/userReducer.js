import { CONSTANT } from "./constant";

export const userReducer = (data = [], action) => {
  switch (action.type) {
    case CONSTANT.SET_USER_LIST:
      return action.data.data.data;
    default:
      return data;
  }
};

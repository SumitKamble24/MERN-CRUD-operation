import { CONSTANT } from "./constant";

export const userAction = (data) => {
  return {
    type: CONSTANT.GET_USER,
    data: data,
  };
};

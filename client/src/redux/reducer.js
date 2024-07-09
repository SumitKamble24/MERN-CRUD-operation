import { CONSTANT } from "./constant";

export const cartData = (data = [], action) => {
  switch (action.type) {
    case CONSTANT.ADD_TO_CART:
      return [action.data, ...data];

    default:
      return data;
  }
};

import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { CONSTANT } from "./constant";

// Worker saga will be fired on SET_USER_LIST actions

function* userSaga(action) {
  let data = yield axios.get(`http://localhost:8080/users`, {
    headers: {
      "x-access-token": action.data,
    },
  });
  yield put({ type: CONSTANT.SET_USER_LIST, data });
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
function* mySaga() {
  yield takeEvery(CONSTANT.GET_USER, userSaga);
}

export default mySaga;

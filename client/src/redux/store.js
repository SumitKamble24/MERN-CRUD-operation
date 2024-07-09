import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import mySaga from "./userSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
// Mount it on the Store
const store = configureStore({
  reducer: rootReducer,
  middleware: () => [sagaMiddleware],
});

// Then run the saga
sagaMiddleware.run(mySaga);

export default store;

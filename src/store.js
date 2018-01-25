import { createStore, applyMiddleware, compose } from "redux";
import commentReducer from "./commentReducer";

const enhancers = [];
const middleware = [];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(commentReducer, composedEnhancers);

export default store;

import React from "react";
import { Provider } from "react-redux";
import createStore from "../src/state/store";

const store = createStore();

const wrapRootElement = element => <Provider store={store}>{element}</Provider>;

export default wrapRootElement;

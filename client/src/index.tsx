import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Store from "./store/user-store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
// import AlertTemplate from 'react-alert-template-basic';

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

ReactDOM.render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>,
  document.getElementById("root")
);

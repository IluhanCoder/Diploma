import React, { useEffect, useContext, FC } from "react";
import { Context } from ".";
import LoginForm from "./components/BodyComps/LoginPage";
import { observer } from "mobx-react-lite";
import Header from "./components/Header";
import Body from "./components/Body";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import { atom } from "recoil";

import { API_URL } from "./http";

const App: FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <Router>
      <Header />
      <Body />
    </Router>
  );
};

export default observer(App);

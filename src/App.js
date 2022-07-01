import React from "react";
import { Route, Routes } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Layout from "./components/Layout/Layout";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";

import { calculateExpireTime, logoutHandler } from "./util";
import { authActions } from "./store/auth/auth-slice";
import NotFound from "./pages/NotFound";

let timeId;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (timeId) {
    clearTimeout(timeId);
  }

  if (isLoggedIn) {
    const expiresIn = localStorage.getItem("expiresIn");
    const remainingTime = calculateExpireTime(expiresIn);
    timeId = setTimeout(() => {
      logoutHandler(dispatch, authActions.logout);
    }, remainingTime);
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {!isLoggedIn && <Route path="/auth" element={<Auth />} />}
        {isLoggedIn && <Route path="/profile" element={<Profile />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;

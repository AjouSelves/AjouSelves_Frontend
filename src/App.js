import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Auth from "./Auth";
import Profile from "./Profile";

import "./App.css";

import kakao_login from "./images/kakao_login.png";

function App() {
  const REST_API_KEY = "f9f1df64f45106996eef35693c66965e";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <a href={KAKAO_AUTH_URL}>
                <img src={kakao_login} width="250px" alt="" />
              </a>
            }
          />
          <Route path="/oauth/kakao/callback" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/view/Layout/Layout";
import GoodsTest from "./components/view/Goods/GoodsTest";
import GoodsAdd from "./components/view/Goods/GoodsAdd";
import GoodsList from "./components/view/Goods/GoodsList";
import LoginPage from "./components/view/LoginPage/LoginPage";
import RegisterPage from "./components/view/RegisterPage/RegisterPage";

import "./App.css";
import LandingPage from "./components/view/LandingPage/LandingPage";

const REST_API_KEY = "f9f1df64f45106996eef35693c66965e";
const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/goods" element={<Layout children={<GoodsTest />} />} />
          <Route
            path="/goods/add"
            element={<Layout children={<GoodsAdd />} />}
          />
          <Route path="/goods/item" element={<GoodsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

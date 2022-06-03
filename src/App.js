import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/view/Layout/Layout";

import Goods from "./components/view/Goods/Goods";
import GoodsAdd from "./components/view/Goods/GoodsAdd";
import GoodsInfo from "./components/view/Goods/GoodsInfo";
import GoodsEdit from "./components/view/Goods/GoodsEdit";
import LoginPage from "./components/view/LoginPage/LoginPage";
import RegisterPage from "./components/view/RegisterPage/RegisterPage";
import LandingPage from "./components/view/LandingPage/LandingPage";
import MyPage from "./Page/MyPage/MyPage";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={<Layout children={<LandingPage />} />}
          />

          <Route path="/login" element={<Layout children={<LoginPage />} />} />
          <Route
            path="/register"
            element={<Layout children={<RegisterPage />} />}
          />
          <Route path="/mypage" element={<Layout children={<MyPage />} />} />
          <Route path="/goods" element={<Layout children={<Goods />} />} />
          <Route
            path="/goods/info"
            element={<Layout children={<GoodsInfo />} />}
          />
          <Route
            path="/goods/add"
            element={<Layout children={<GoodsAdd />} />}
          />
          <Route
            path="/goods/edit"
            element={<Layout children={<GoodsEdit />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

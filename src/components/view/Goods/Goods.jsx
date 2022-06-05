import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { SERVER_URL } from "../../../_actions/types";
import { projGetAll } from "../../../_actions/goods_actions";
import thumbnail from "../../../images/thumbnail.jpeg";

// 굿즈 정보 받아오는 컴포넌트

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;

  padding: 250px 100px;
`;

const Card = styled.div`
  padding: 20px;

  cursor: pointer;
`;

function Goods() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [GoodsList, setGoodsList] = useState("");

  const login_token = window.localStorage.getItem("login-token");

  useEffect(() => {
    dispatch(projGetAll()).then((res) => {
      setGoodsList(res.payload);
    });
  }, []);

  if (!GoodsList) return null;

  return (
    <Container>
      {GoodsList.map((GoodsList) => (
        <Card
          key={GoodsList.projid}
          onClick={() => {
            console.log(GoodsList.projid);
            if (login_token === null) alert("로그인 후 진행해주세요!");
            else navigate("/goods/info", { state: GoodsList.projid });
          }}
        >
          {GoodsList.url ? (
            <img
              alt="no_image"
              src={`${SERVER_URL}${GoodsList.url}`}
              width="300px"
              height="300px"
            />
          ) : (
            <img alt="thumbnail" src={thumbnail} width="300px" height="300px" />
          )}
          <div>{GoodsList.title}</div>
          <div>{GoodsList.nickname}</div>
        </Card>
      ))}
    </Container>
  );
}

export default Goods;

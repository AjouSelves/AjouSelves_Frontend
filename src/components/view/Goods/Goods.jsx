import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { SERVER_URL } from "../../../_actions/types";
import { projGetAll } from "../../../_actions/goods_actions";
import thumbnail from "../../../images/thumbnail.jpeg";
import GlobalFonts from "../../../font/font";

// 굿즈 정보 받아오는 컴포넌트

const Container = styled.div`
  font-weight: 300;
  font-size: 14px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;

  padding: 100px;
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

  const percentage = (curr, min) => {
    return ((curr / min) * 100).toFixed(1);
  };

  if (!GoodsList) return null;

  return (
    <div>
      <GlobalFonts />
      <div style={{ fontSize: "32px", fontWeight: "500" }}>
        모집중인 굿즈 리스트
      </div>
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
              <img
                alt="thumbnail"
                src={thumbnail}
                width="300px"
                height="300px"
              />
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div className="1">
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    marginTop: "10px",
                  }}
                >
                  {GoodsList.title}
                </div>
                <div>{GoodsList.nickname}</div>
              </div>
              <div className="2">
                <div>
                  {GoodsList.cur_num} / {GoodsList.min_num}{" "}
                  {percentage(GoodsList.cur_num, GoodsList.min_num)}%
                </div>
              </div>
              <div className="3">
                <div>{GoodsList.created_at.split("T")[0]}</div>
              </div>
              <div className="4">
                <div>{GoodsList.amount}원</div>
              </div>
            </div>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default Goods;

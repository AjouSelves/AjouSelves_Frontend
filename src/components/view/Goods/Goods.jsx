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
    return ((curr / min) * 100).toFixed(0);
  };

  if (!GoodsList) return null;

  return (
    <div>
      <GlobalFonts />
      <Container>
        <div
          style={{
            fontSize: "32px",
            fontWeight: "500",
            borderBottom: "1px solid black",
            paddingBottom: "10px",
            gridColumn: "1/span4",
          }}
        >
          🤝🏻 모집중인 굿즈 리스트
        </div>
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
            <div
              style={{
                width: "300px",
                display: "grid",
                gridTemplateColumns: "1.8fr 1fr",
                gridAutoRows: "minmax(25px, auto)",
                justifyItems: "end",
                alignItems: "end",
              }}
            >
              <div className="1" style={{ justifySelf: "start" }}>
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
                <div
                  style={{
                    width: "100px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontSize: "16px" }}>
                    {GoodsList.cur_num}명 / {GoodsList.min_num}명
                  </div>
                  <div style={{ color: "red" }}>
                    {percentage(GoodsList.cur_num, GoodsList.min_num)}%
                  </div>
                </div>
              </div>
              <div className="3" style={{ justifySelf: "start" }}>
                <div>{GoodsList.created_at.split("T")[0]}</div>
              </div>
              <div className="4">
                <div style={{ fontSize: "16px", color: "red" }}>
                  {GoodsList.amount}원
                </div>
              </div>
            </div>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default Goods;

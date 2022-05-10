import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import GlobalFonts from "../../../font/font";
import thumbnail from "../../../images/thumbnail.jpeg";
import { projDelete } from "../../../_actions/goods_actions";

const Container = styled.div`
  font-family: "S-CoreDream-9Black";
  font-weight: 200;
  font-size: 18px;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

// 특정 굿즈 정보 보여주는 component

function GoodsInfo(Goods) {
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    console.log("delete 실행");

    const login_token = window.localStorage.getItem("login-token");
    let header = {
      headers: {
        Authorization: login_token,
      },
    };

    console.log("header: ", header);

    dispatch(projDelete(50, header)).then((res) => {
      if (res.payload.status === "success") {
        alert("삭제 완료");
      } else {
        alert("error");
      }
    });
  };

  const [Image] = useState(Goods.Goods.photos);
  console.log(Image);
  return (
    <Container>
      <GlobalFonts />
      <div>
        <h2>{Goods.Goods.title}</h2>
        <button onClick={onDeleteHandler}>굿즈 삭제하기</button>
      </div>
      <Body>
        <div>
          image:
          {Image && (
            // <img
            //   alt="thumbnail"
            //   src={`http://44.202.49.100:3000/${Image}`}
            //   width="200px"
            //   height="200px"
            // />
            <img
              src={
                Image === ""
                  ? `http://44.202.49.100:3000/${Image}`
                  : { thumbnail }
              }
              alt=""
            />
          )}
        </div>
        <div>
          <div>상품 구성: </div>
          <div>목표 금액: </div>
          <div>
            판매 일정:
            <div>판매 종료: </div>
            <div>결제 예정: </div>
            <div>발송 예정: </div>
          </div>
          <div>문의 연락처: </div>
          <button>굿즈 구매하러 가기</button>
        </div>
      </Body>
      <div>
        <h2>굿즈 소개</h2>
        <div>{Goods.Goods.explained}</div>
      </div>
    </Container>
  );
}

export default GoodsInfo;

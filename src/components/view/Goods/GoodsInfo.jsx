import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import GlobalFonts from "../../../font/font";
import thumbnail from "../../../images/thumbnail.jpeg";
import { SERVER_URL } from "../../../_actions/types";
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

const GoodsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

// 특정 굿즈 정보 보여주는 component

function GoodsInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const [projid] = useState(state);
  const GoodsList = useSelector((state) => state.goods.getAll);

  const Goods = useMemo(() => {
    return GoodsList.find((f) => f.projid === projid);
  }, [GoodsList]);

  const login_token = window.localStorage.getItem("login-token");
  let header = {
    headers: {
      Authorization: login_token,
    },
  };

  const onDeleteHandler = () => {
    console.log("delete 실행");

    console.log("header: ", header);

    dispatch(projDelete(Goods.projid, header)).then((res) => {
      if (res.payload.text === "success") {
        alert("삭제 완료");
        navigate("/goods");
      } else {
        alert("글 작성자만 삭제가 가능합니다.");
      }
    });
  };

  const onEditHandler = () => {
    console.log("edit 실행");

    console.log("header: ", header);
    navigate("/goods/edit", { state: Goods });
  };

  console.log(Goods);

  const [Image] = useState(Goods.url);
  console.log(Image);

  return (
    <GoodsListBlock>
      <Container>
        <GlobalFonts />
        <div>
          <h2>{Goods.title}</h2>
          <button onClick={onDeleteHandler}>굿즈 삭제하기</button>
          <button onClick={onEditHandler}>굿즈 수정하기</button>
        </div>
        <Body>
          <div>
            {!Image ? (
              <img alt="thumbnail" src={thumbnail} />
            ) : (
              <img
                alt="thumbnail"
                src={`${SERVER_URL}${Image}`}
                width="200px"
                height="200px"
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
          <div>{Goods.explained}</div>
          <div>{Goods.projid}</div>
        </div>
      </Container>
    </GoodsListBlock>
  );
}

export default GoodsInfo;

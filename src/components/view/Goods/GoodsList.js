import React, { useState } from "react";
import styled from "styled-components";

import thumbnail from "../../../images/thumbnail.jpeg";

const Container = styled.div`
  display: grid;
`;

function GoodsList(Goods) {
  const [Image, setImage] = useState(Goods.Goods.photos);
  console.log(Image);
  return (
    <Container>
      <div>title: {Goods.Goods.title}</div>
      <div>
        image: {Image}
        {/* {Image && (
          <img
            alt="thumbnail"
            src={`http://44.202.49.100:3000/${Image}`}
            width="200px"
            height="200px"
          /> */}
        <img
          src={
            Image === ")}"
              ? `http://44.202.49.100:3000/${Image}`
              : { thumbnail }
          }
          alt=""
        />
        <div>상품 구성</div>
        <div>목표 금액: </div>
        <div>
          판매 일정
          <div>판매 종료</div>
          <div>결제 예정</div>
          <div>발송 예정</div>
        </div>
        <div>문의 연락처: </div>
        <button>굿즈 구매하러 가기</button>
      </div>
      <div>explained: {Goods.Goods.explained}</div>
    </Container>
  );
}

export default GoodsList;

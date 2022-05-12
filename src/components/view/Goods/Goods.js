import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { projGetAll, projGetById } from "../../../_actions/goods_actions";
import thumbnail from "../../../images/thumbnail.jpeg";

// 굿즈 정보 받아오는 컴포넌트

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;

  padding: 50px 200px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;

  padding: 20px;

  cursor: pointer;
`;

function Goods() {
  const dispatch = useDispatch();

  const [Goods, setGoods] = useState("");
  const [GoodsList, setGoodsList] = useState("");

  useEffect(() => {
    dispatch(projGetAll()).then((res) => {
      setGoodsList(res.payload);
      console.log(res);
    });
  }, []);

  console.log(GoodsList);

  if (!GoodsList) return null;

  return (
    <Container>
      {GoodsList.map((GoodsList) => (
        <Card
          key={GoodsList.projid}
          goods={GoodsList}
          onClick={() => {
            console.log(GoodsList.projid);
          }}
        >
          {GoodsList.url ? (
            <img
              alt="no_image"
              src={`http://44.202.49.100:3000${GoodsList.url}`}
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

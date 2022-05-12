import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { projGetAll, projGetById } from "../../../_actions/goods_actions";
import thumbnail from "../../../images/thumbnail.jpeg";

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

// 굿즈 정보 받아오는 컴포넌트

function Goods() {
  const dispatch = useDispatch();

  const [Goods, setGoods] = useState("");

  useEffect(() => {
    dispatch(projGetAll()).then((res) => {
      setGoods(res.payload);
      console.log(res);
    });
  }, []);

  console.log(Goods);

  if (!Goods) return null;

  return (
    <GoodsListBlock>
      {Goods.map((Goods) => (
        <div key={Goods.projid} goods={Goods}>
          {Goods.url ? (
            <img alt="no_image" src={`http://44.202.49.100:3000${Goods.url}`} />
          ) : (
            <img alt="thumbnail" src={thumbnail} />
          )}
          <br />
          {Goods.title}
          <br />
          {Goods.nickname}
          <br />
          <br />
        </div>
      ))}
    </GoodsListBlock>
  );
}

export default Goods;

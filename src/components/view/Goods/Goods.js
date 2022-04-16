import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { projGetById } from "../../../_actions/goods_actions";

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

function Goods() {
  const dispatch = useDispatch();

  const [Goods, setGoods] = useState("");

  useEffect(() => {
    dispatch(projGetById(2)).then((res) => {
      setGoods(res.payload);
      console.log(res);
    });
  }, []);

  console.log(Goods);

  if (!Goods) return null;

  return (
    <GoodsListBlock>
      {Goods.map((Goods) => (
        <div key={Goods.title} goods={Goods}></div>
      ))}
    </GoodsListBlock>
  );
}

export default Goods;

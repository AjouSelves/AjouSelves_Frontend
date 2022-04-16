import React, { useState } from "react";

function GoodsList(Goods) {
  const [Image, setImage] = useState(Goods.Goods.photos);

  return (
    <div>
      <div>title: {Goods.Goods.title}</div>
      <div>explained: {Goods.Goods.explained}</div>
      <div>
        image: {Image}
        {Image && (
          <img
            alt="sample"
            src={`http://44.202.49.100:3000/${Image}`}
            width="200px"
            height="200px"
          />
        )}
      </div>
    </div>
  );
}

export default GoodsList;

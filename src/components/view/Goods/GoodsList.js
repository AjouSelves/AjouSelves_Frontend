import React, { useState } from "react";

import thumbnail from "../../../images/thumbnail.jpeg";

function GoodsList(Goods) {
  const [Image, setImage] = useState(Goods.Goods.photos);
  console.log(Image);
  return (
    <div>
      <div>title: {Goods.Goods.title}</div>
      <div>explained: {Goods.Goods.explained}</div>
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
      </div>
    </div>
  );
}

export default GoodsList;

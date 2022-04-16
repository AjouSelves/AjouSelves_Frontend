import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { projAdd } from "../../../_actions/goods_actions";

function GoodsAdd() {
  const dispatch = useDispatch();

  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");
  const [Minimum, setMinimum] = useState("");
  const [Category, setCategory] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      userid: 4,
      title: Title,
      explaiend: Content,
      //image: Image,
      min_num: 30,
      category: Category,
      required: "",
    };

    console.log("body: ", body);

    dispatch(projAdd(body)).then((res) => {
      if (res.payload.status === "success") {
        alert("등록 완료");
      } else {
        alert("error");
      }
    });
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        제목
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <div>
          내용
          <textarea
            onChange={(e) => {
              setContent(e.currentTarget.value);
            }}
          ></textarea>
        </div>
        <div>
          최소 요구 인원
          <input
            type="number"
            onChange={(e) => {
              setMinimum(e.currentTarget.value);
            }}
          />
        </div>
        <div>
          카테고리
          <input
            type="text"
            onChange={(e) => {
              setCategory(e.currentTarget.value);
            }}
          />
        </div>
        <div>
          <div>
            {Image && (
              <img alt="sample" src={Image} width="200px" height="200px" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              e.preventDefault();
              setImage(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default GoodsAdd;

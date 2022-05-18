import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import GlobalFonts from "../../../font/font";
import thumbnail from "../../../images/thumbnail.jpeg";
import { projAdd, projAddSingle } from "../../../_actions/goods_actions";

// 굿즈 등록 component

const StyledForm = styled.form`
  font-family: "S-CoreDream-9Black";
  font-weight: 200;
  font-size: 18px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 50px 200px;
`;

function GoodsAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Title, setTitle] = useState("");
  const [Explained, setExplained] = useState("");
  const [Image, setImage] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [Minimum, setMinimum] = useState();
  const [Category, setCategory] = useState("");

  const formData = new FormData();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      title: Title,
      explained: Explained,
      image: formData,
      min_num: Minimum,
      category: Category,
      required: "",
    };

    const login_token = window.localStorage.getItem("login-token");
    let header = {
      headers: {
        Authorization: login_token,
      },
    };

    console.log("body: ", body);
    console.log("header: ", header);

    if (Image === "") {
      dispatch(projAdd(body, header)).then((res) => {
        if (res.payload.status === "success") {
          alert("등록 완료");
          navigate("/goods");
        } else {
          alert("error");
        }
      });
    } else {
      console.log("Image:", Image);
      console.log("formData: ", formData);
      dispatch(projAddSingle(body, header)).then((res) => {
        if (res.payload.status === "success") {
          alert("등록 완료");
          navigate("/goods");
        } else {
          alert("error");
        }
      });
    }
  };
  return (
    <div>
      <GlobalFonts />
      <StyledForm onSubmit={onSubmitHandler}>
        <p>제목을 입력해 주시기 바랍니다.</p>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
          style={{ width: "80%", height: 30 }}
        />
        <br />
        <div>
          <p>썸네일을 업로드 해주시기 바랍니다.</p>
          <div>
            {Image === "" ? (
              <img alt="thumbnail" src={thumbnail} />
            ) : (
              <img alt="error" src={ImageUrl} width="200px" height="200px" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              e.preventDefault();
              setImage(e.target.files[0]);
              setImageUrl(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>
        <br />
        <div>
          <p>굿즈를 자유롭게 설명해 주시기 바랍니다.</p>
          <textarea
            onChange={(e) => {
              setExplained(e.currentTarget.value);
            }}
            style={{ width: "80%", height: "300px", resize: "none" }}
          ></textarea>
        </div>
        <br />
        <div>
          <p>최소요구인원을 설정 해주시기 바랍니다.</p>
          <input
            type="number"
            onChange={(e) => {
              setMinimum(e.currentTarget.value);
            }}
          />
        </div>
        <br />
        <div>
          <p>카테고리</p>
          <input
            type="text"
            onChange={(e) => {
              setCategory(e.currentTarget.value);
            }}
          />
        </div>
        <button
          type="submit"
          style={{ width: "300px", height: "30px", alignSelf: "center" }}
        >
          굿즈 모집하기
        </button>
      </StyledForm>
    </div>
  );
}

export default GoodsAdd;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import GlobalFonts from "../../../font/font";
import { projEdit } from "../../../_actions/goods_actions";
import { SERVER_URL } from "../../../_actions/types";

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

function GoodsEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  console.log(state);

  const [Title, setTitle] = useState(state.title);
  const [Explained, setExplained] = useState(state.explained);
  const [Image, setImage] = useState(state.url);
  const [ImageUrl, setImageUrl] = useState("");
  const [Minimum, setMinimum] = useState(state.min_num);
  const [Category, setCategory] = useState("");

  const [ChkChange, setChkChange] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      title: Title,
      explained: Explained,
      image: Image,
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

    dispatch(projEdit(state.projid, body, header)).then((res) => {
      if (res.payload.text === "success") {
        alert("수정 완료");
        navigate("/goods");
      } else {
        alert("글 작성자만 수정할 수 있습니다.");
        navigate("/goods");
      }
    });
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
          value={Title}
        />
        <br />
        <div>
          <p>썸네일을 업로드 해주시기 바랍니다.</p>
          <div>
            {ChkChange ? (
              <img alt="no_image" src={ImageUrl} width="300px" height="300px" />
            ) : (
              <img
                alt="sample"
                src={`${SERVER_URL}${Image}`}
                width="300px"
                height="300px"
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              e.preventDefault();
              setImage(e.target.files[0]);
              setImageUrl(URL.createObjectURL(e.target.files[0]));
              setChkChange(true);
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
            value={Explained}
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
            value={Minimum}
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
          굿즈 수정하기
        </button>
      </StyledForm>
    </div>
  );
}

export default GoodsEdit;
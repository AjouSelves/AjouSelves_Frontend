import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import GlobalFonts from "../../../font/font";
import { projEdit, projEditPhoto } from "../../../_actions/goods_actions";
import { SERVER_URL } from "../../../_actions/types";

// 굿즈 등록 component

const StyledForm = styled.form`
  font-weight: 700;
  font-size: 18px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 50px 200px;
`;

const InputBox = styled.div`
  margin-top: 20px;
`;

const StyledInput = styled.input`
  width: 80%;
  height: 48px;
  margin-top: 10px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
`;

const StyledInputSmall = styled.input`
  width: 25%;
  height: 48px;

  border: none;
  border-bottom: 1px solid black;
  outline: none;
`;

const StyledButton = styled.button`
  border: none;
  background: #24272b;
  color: white;
  margin-top: 30px;
  padding: 8px 15px;
  height: 32px;
  font-size: 12px;
  line-height: 14px;
  cursor: pointer;
`;

function GoodsEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  console.log(state);

  const [Title, setTitle] = useState(state.title);
  const [Explained, setExplained] = useState(state.explained);
  const [Files, setFiles] = useState();
  const [ImageUrl, setImageUrl] = useState(state.url);
  const [Minimum, setMinimum] = useState(state.min_num);
  const [Category, setCategory] = useState("");
  const [Amount, setAmount] = useState(state.amount);

  const [ChkChange, setChkChange] = useState(false);

  const formData = new FormData();

  if (Image === null) {
    console.log("image is null");
    console.log(Image);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const login_token = window.localStorage.getItem("login-token");

    if (Files === undefined) {
      console.log("projEdit");
      let header = {
        headers: {
          Authorization: login_token,
        },
      };
      let body = {
        title: Title,
        explained: Explained,
        image: "",
        min_num: Minimum,
        category: Category,
        required: "",
        amount: Amount,
      };
      dispatch(projEdit(state.projid, body, header)).then((res) => {
        if (res.payload.text === "글 수정이 완료되었습니다.") {
          alert("수정이 완료되었습니다.");
          navigate("/goods");
        } else {
          alert("ERROR! 다시 시도해주세요!");
        }
      });
    } else {
      let header = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: login_token,
        },
      };

      console.log("Files is");
      console.log(Files);

      formData.append("title", Title);
      formData.append("explained", Explained);
      formData.append("min_num", Minimum);
      formData.append("category", Category);
      formData.append("required", "");
      formData.append("amount", Amount);

      for (var i = 0; i < Files.length; i++) {
        formData.append("photo", Files[i]);
      }

      console.log(formData.getAll("photo"));
      console.log(state.projid);

      dispatch(projEditPhoto(state.projid, formData, header)).then((res) => {
        if (res.payload.status === "success") {
          alert("수정 완료");
          navigate("/goods");
        } else {
          alert("error");
        }
      });
    }
  };
  return (
    <div style={{ width: "1200px", margin: "0 auto" }}>
      <GlobalFonts />
      <StyledForm onSubmit={onSubmitHandler}>
        <InputBox>
          🌟 굿즈의 이름을 지어주세요
          <StyledInput
            type="text"
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
            value={Title}
          />
        </InputBox>
        <br />
        <InputBox>
          썸네일을 업로드 해주시기 바랍니다.
          <div style={{ marginTop: "10px" }}>
            {ChkChange || Image === null ? (
              <img alt="no_image" src={ImageUrl} width="300px" height="300px" />
            ) : (
              <img
                alt="sample"
                src={`${SERVER_URL}${ImageUrl}`}
                width="300px"
                height="300px"
              />
            )}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              e.preventDefault();
              setImageUrl(e.target.files[0]);
              const files = e.target.files;
              setFiles(files);
              setImageUrl(URL.createObjectURL(e.target.files[0]));
              setChkChange(true);
            }}
          />
        </InputBox>
        <br />
        <InputBox>
          📝 굿즈에 대한 설명을 적어주세요
          <textarea
            onChange={(e) => {
              setExplained(e.currentTarget.value);
            }}
            style={{
              width: "100%",
              height: "300px",
              resize: "none",
              marginTop: "10px",
            }}
            value={Explained}
          ></textarea>
        </InputBox>
        <br />
        <InputBox>
          👨‍👩‍👦 최소요구인원을 설정 해주시기 바랍니다.
          <br />
          <StyledInputSmall
            type="number"
            onChange={(e) => {
              setMinimum(e.currentTarget.value);
            }}
            value={Minimum}
          />
        </InputBox>
        <br />
        <InputBox>
          📚 카테고리
          <br />
          <StyledInputSmall
            type="text"
            onChange={(e) => {
              setCategory(e.currentTarget.value);
            }}
          />
        </InputBox>
        <InputBox>
          💰 가격 설정
          <br />
          <StyledInputSmall
            type="number"
            onChange={(e) => {
              setAmount(e.currentTarget.value);
            }}
            value={Amount}
          />
        </InputBox>
        <StyledButton
          type="submit"
          style={{
            width: "100%",
            height: "30px",
            alignSelf: "center",
            marginTop: "50px",
          }}
        >
          굿즈 수정하기
        </StyledButton>
      </StyledForm>
    </div>
  );
}

export default GoodsEdit;

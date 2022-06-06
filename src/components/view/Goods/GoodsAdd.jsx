import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import thumbnail from "../../../images/thumbnail.jpeg";
import { projAdd, projAddPhoto } from "../../../_actions/goods_actions";

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

function GoodsAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Title, setTitle] = useState("");
  const [Explained, setExplained] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [Files, setFiles] = useState();
  const [Minimum, setMinimum] = useState();
  const [Category, setCategory] = useState("");
  const [Amount, setAmount] = useState();

  const formData = new FormData();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const login_token = window.localStorage.getItem("login-token");

    if (Files === undefined) {
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
        require: "",
        amount: Amount,
      };
      console.log("body: ", body);
      console.log("header: ", header);
      dispatch(projAdd(body, header)).then((res) => {
        if (res.payload.status === "success") {
          alert("등록 완료");
          navigate("/goods");
        } else {
          alert("error");
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

      dispatch(projAddPhoto(formData, header)).then((res) => {
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
    <div style={{ width: "1200px", margin: "0 auto" }}>
      <StyledForm onSubmit={onSubmitHandler}>
        <InputBox>
          🌟 굿즈의 이름을 지어주세요
          <StyledInput
            type="text"
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
            placeholder="ex) 굿즈바이어스"
          />
        </InputBox>
        <br />
        <InputBox>
          썸네일을 업로드 해주시기 바랍니다.
          <div style={{ marginTop: "10px" }}>
            {ImageUrl === "" ? (
              <img alt="thumbnail" src={thumbnail} />
            ) : (
              <img alt="error" src={ImageUrl} width="400px" height="400px" />
            )}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = e.target.files;
              setFiles(files);
              setImageUrl(URL.createObjectURL(e.target.files[0]));
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
            placeholder="숫자만 입력해주세요. ex) 50"
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
            placeholder="ex) 의류, 전자기기 등"
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
            placeholder="숫자만 입력해주세요. ex) 50000"
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
          굿즈 모집하기
        </StyledButton>
      </StyledForm>
    </div>
  );
}

export default GoodsAdd;

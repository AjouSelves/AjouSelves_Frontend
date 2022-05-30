import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { loginUser } from "../../../_actions/user_actions";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin: 30px 0;
  font-size: 14px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  margin-top: 10px;
`;

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((res) => {
      if (res.payload.status === "success") {
        alert("로그인 성공");
        localStorage.setItem("login-token", res.payload.token);
        navigate("/");
      } else {
        alert("이메일 또는 비밀번호를 다시 확인해주세요.");
      }
    });
  };

  return (
    <div style={{ width: "384px", margin: "200px auto" }}>
      <StyledForm onSubmit={onSubmitHandler}>
        <StyledInput
          type="email"
          value={Email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
          placeholder="이메일"
        ></StyledInput>
        <StyledInput
          type="password"
          value={Password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
          placeholder="비밀번호"
        ></StyledInput>
        <div>
          <button type="submit">로그인</button>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            회원가입하기
          </button>
        </div>
      </StyledForm>
    </div>
  );
}

export default LoginPage;

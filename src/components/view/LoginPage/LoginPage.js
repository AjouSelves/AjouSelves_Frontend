import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { loginUser } from "../../../_actions/user_actions";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
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
      if (res.payload.code === 200) {
        //alert("Login successed");
        localStorage.setItem("login-token", res.payload.token);
        navigate("/");
      } else {
        alert("이메일 또는 비밀번호를 다시 확인해주세요.");
      }
    });
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <StyledForm onSubmit={onSubmitHandler}>
        <input
          type="email"
          value={Email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
          placeholder="이메일"
        />
        <input
          type="password"
          value={Password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
          placeholder="비밀번호"
        />
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

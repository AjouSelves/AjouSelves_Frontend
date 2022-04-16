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
    console.log("Email: ", Email);
    console.log("Password: ", Password);

    let body = {
      email: Email,
      password: Password,
    };

    console.log("dataToLogin", body);

    dispatch(loginUser(body)).then((res) => {
      if (res.payload.code === 200) {
        //alert("Login successed");
        localStorage.setItem("login-token", res.payload.token);
        navigate("/");
      } else {
        alert("error");
      }
    });
  };

  return (
    <div>
      <StyledForm onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={Email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
          placeholder="ID"
        />
        <input
          type="password"
          value={Password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </StyledForm>
    </div>
  );
}

export default LoginPage;

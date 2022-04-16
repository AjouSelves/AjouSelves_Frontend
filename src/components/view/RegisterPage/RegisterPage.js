import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { registerUser } from "../../../_actions/user_actions";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const [Nickname, setNickname] = useState("");
  const [Status, setStatus] = useState("");
  const [Socialtype, setSocialtype] = useState("");
  const [Sex, setSex] = useState("");
  const [Birth, setBirth] = useState("");
  const [Address, setAddress] = useState("");
  const [Bank, setBank] = useState("");
  const [Account, setAccount] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onNicknameHandler = (e) => {
    setNickname(e.currentTarget.value);
  };

  const onBankHandler = (e) => {
    setBank(e.currentTarget.value);
  };

  const onAccountHandler = (e) => {
    setAccount(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
      password: Password,
      phonenumber: Phonenumber,
      nickname: Nickname,
      status: Status,
      socialtype: Socialtype,
      sex: Sex,
      birth: Birth,
      address: Address,
      account: `${Bank} ${Account}`,
    };

    console.log("body: ", body);

    dispatch(registerUser(body)).then((res) => {
      if (res.payload) {
        alert("Register successed");
        navigate("/");
      } else {
        alert("error");
      }
    });
  };

  return (
    <div>
      <StyledForm onSubmit={onSubmitHandler}>
        <label>
          이메일:
          <input
            type="email"
            value={Email}
            onChange={onEmailHandler}
            placeholder="email"
          />
        </label>
        <label>
          비밀번호:
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="password"
          />
        </label>
        <label>
          <input type="radio" name="status" value="재학생" />
          재학생
          <input type="radio" name="status" value="졸업생" />
          졸업생
          <input type="radio" name="status" value="외부인" />
          외부인
        </label>
        <label>
          닉네임:
          <input
            type="text"
            value={Nickname}
            onChange={onNicknameHandler}
            placeholder="nickname"
          />
        </label>
        <label>
          성별:
          <input type="radio" name="sex" value="남자" />
          남자
          <input type="radio" name="sex" value="여자" />
          여자
        </label>
        <label>
          생년월일:
          <input type="date" name="birthday" />
        </label>
        <label>
          환불받을 계좌:{" "}
          <input type="text" list="bank_list" onChange={onBankHandler} />
          <input
            type="text"
            placeholder="account"
            onChange={onAccountHandler}
          />
          <datalist id="bank_list">
            <option value="국민은행"></option>
            <option value="하나은행"></option>
            <option value="신한은행"></option>
            <option value="기업은행"></option>
            <option value="카카오뱅크"></option>
          </datalist>
        </label>
        <button type="submit">Register</button>
      </StyledForm>
    </div>
  );
}

export default RegisterPage;

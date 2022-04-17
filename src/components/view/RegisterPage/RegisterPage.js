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
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const [Nickname, setNickname] = useState("");
  const [Status, setStatus] = useState("");
  const [Socialtype, setSocialtype] = useState("");
  const [Sex, setSex] = useState("");
  const [Birth, setBirth] = useState("");
  const [Address, setAddress] = useState("");
  const [Bank, setBank] = useState("");
  const [Account, setAccount] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
      password: Password,
      phonenumber: Phonenumber,
      nickname: Nickname,
      status: Status,
      socialtype: "test",
      sex: Sex,
      birth: Birth,
      address: "test",
      account: `${Bank} ${Account}`,
      profilelink: "test",
    };

    console.log("body: ", body);

    if (Password !== ConfirmPassword) {
      return alert("회원가입 완료!");
    } else {
      dispatch(registerUser(body)).then((res) => {
        console.log(res);
        if (res.payload) {
          alert("회원가입 완료!");
          navigate("/");
        } else {
          alert("error");
        }
      });
    }
  };

  return (
    <div>
      <StyledForm onSubmit={onSubmitHandler}>
        <label>
          이메일:{" "}
          <input
            type="email"
            value={Email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
            placeholder="이메일을 입력해주세요."
          />
        </label>
        <label>
          비밀번호:{" "}
          <input
            type="password"
            value={Password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            placeholder="비밀번호"
          />
        </label>
        <label>
          비밀번호 확인:{" "}
          <input
            type="password"
            value={ConfirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.currentTarget.value);
            }}
            placeholder="비밀번호 확인"
          />
        </label>
        <label>
          전화번호:{" "}
          <input
            type="text"
            value={Phonenumber}
            onChange={(e) => {
              setPhonenumber(e.currentTarget.value);
            }}
            placeholder="010-1234-5678"
          />
        </label>
        <label>
          닉네임:{" "}
          <input
            type="text"
            value={Nickname}
            onChange={(e) => {
              setNickname(e.currentTarget.value);
            }}
            placeholder="닉네임"
          />
        </label>
        <label
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          구분: <input type="radio" name="status" value="재학생" />
          재학생
          <input type="radio" name="status" value="졸업생" />
          졸업생
          <input type="radio" name="status" value="외부인" />
          외부인
        </label>

        <label
          onChange={(e) => {
            setSex(e.target.value);
          }}
        >
          성별: <input type="radio" name="sex" value="남자" />
          남자
          <input type="radio" name="sex" value="여자" />
          여자
        </label>
        <label>
          생년월일:{" "}
          <input
            type="date"
            name="birthday"
            onChange={(e) => {
              setBirth(e.target.value);
            }}
          />
        </label>
        <label>
          환불받을 계좌:{" "}
          <input
            type="text"
            list="bank_list"
            onChange={(e) => {
              setBank(e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="account"
            onChange={(e) => {
              setAccount(e.currentTarget.value);
            }}
          />
          <datalist id="bank_list">
            <option value="국민은행"></option>
            <option value="하나은행"></option>
            <option value="신한은행"></option>
            <option value="기업은행"></option>
            <option value="카카오뱅크"></option>
          </datalist>
        </label>
        <button type="submit">회원가입하기</button>
      </StyledForm>
    </div>
  );
}

export default RegisterPage;

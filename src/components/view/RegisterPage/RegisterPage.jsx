import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { registerUser } from "../../../_actions/user_actions";

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

const StyledSelect = styled.select`
  width: 100%;
  height: 48px;
  margin-top: 10px;
`;

const InputBox = styled.div`
  margin-top: 20px;
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
  const [Name, setName] = useState("");
  const [Birth, setBirth] = useState("");
  const [Sex, setSex] = useState("");
  const [Address, setAddress] = useState("");
  const [Bank, setBank] = useState("");
  const [Account, setAccount] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
      password: Password,
      name: Name,
      phonenumber: Phonenumber,
      nickname: Nickname,
      status: Status,
      socialtype: "local",
    };

    console.log("body: ", body);

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 올바르지 않습니다!");
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
    <div style={{ width: "384px", margin: "0 auto" }}>
      <StyledForm onSubmit={onSubmitHandler}>
        <InputBox>
          <label>
            <strong className="red">*</strong> 이메일
          </label>
          <StyledInput
            type="email"
            value={Email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
            placeholder="이메일을 입력해주세요."
            required
          />
        </InputBox>
        <InputBox>
          <label>
            <strong className="red">*</strong> 비밀번호
          </label>
          <StyledInput
            type="password"
            value={Password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            placeholder="비밀번호"
            required
          />
          <StyledInput
            type="password"
            value={ConfirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.currentTarget.value);
            }}
            placeholder="비밀번호 확인"
            required
          />
        </InputBox>
        <InputBox>
          <label>
            <strong className="red">*</strong> 이름
          </label>
          <StyledInput
            type="text"
            value={Name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
            placeholder="이름"
            required
          />
        </InputBox>
        <InputBox>
          <label>
            <strong className="red">*</strong> 전화번호
          </label>
          <StyledInput
            type="text"
            value={Phonenumber}
            onChange={(e) => {
              setPhonenumber(e.currentTarget.value);
            }}
            placeholder="010-1234-5678"
            required
          />
        </InputBox>
        <InputBox>
          <label>
            <strong className="red">*</strong> 닉네임
          </label>
          <StyledInput
            type="text"
            value={Nickname}
            onChange={(e) => {
              setNickname(e.currentTarget.value);
            }}
            placeholder="닉네임"
            required
          />
        </InputBox>
        {/* <InputBox>
          <label
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <strong className="red">*</strong> 성별
          </label>
          <StyledSelect
            onChange={(e) => {
              setSex(e.target.value);
            }}
          >
            <option value={0}>남자</option>
            <option value={1}>여자</option>
          </StyledSelect>
        </InputBox> */}
        <InputBox>
          <label
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <strong className="red">*</strong> 학적상태 선택
          </label>
          <StyledSelect
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="재학생">재학생</option>
            <option value="졸업생">졸업생</option>
            <option value="외부인">외부인</option>
          </StyledSelect>
        </InputBox>
        {/* <InputBox>
          <label>
            <strong className="red">*</strong> 생년월일
          </label>
          <StyledInput
            type="date"
            name="birthday"
            onChange={(e) => {
              setBirth(e.target.value);
            }}
          />
        </InputBox> */}
        {/* <InputBox>
          <label>
            <strong className="red">*</strong> 환불계좌 입력
          </label>
          <div>
            <StyledSelect
              onChange={(e) => {
                setBank(e.currentTarget.value);
              }}
            >
              <option value="국민은행">국민은행</option>
              <option value="하나은행">하나은행</option>
              <option value="신한은행">신한은행</option>
              <option value="기업은행">기업은행</option>
              <option value="카카오뱅크">카카오뱅크</option>
            </StyledSelect>
            <StyledInput
              type="text"
              placeholder="account"
              onChange={(e) => {
                setAccount(e.currentTarget.value);
              }}
              required
            />
          </div>
        </InputBox> */}
        <button type="submit">회원가입하기</button>
      </StyledForm>
    </div>
  );
}

export default RegisterPage;

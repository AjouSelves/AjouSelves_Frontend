import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { registerUser, emailVerify } from "../../../_actions/user_actions";

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
  border: none;
  border-bottom: 1px solid black;
  outline: none;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 48px;
  margin-top: 10px;
`;

const InputBox = styled.div`
  margin-top: 40px;
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

const StyledLabel = styled.label`
  font-weight: 700;
  font-size: 18px;
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

  const [VerifyNum, setVerifyNum] = useState();
  const [EmailNum, setEmailNum] = useState();
  const [ChkVerify, setChkVerify] = useState(false);
  const [Completed, setCompleted] = useState(false);
  const [isChked, setIsChked] = useState(false);

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

    // console.log("body: ", body);

    if (!isChked) alert("이메일 인증을 진행해주세요");
    else {
      if (Password !== ConfirmPassword) {
        return alert("비밀번호가 올바르지 않습니다!");
      } else {
        dispatch(registerUser(body)).then((res) => {
          // console.log(res);
          if (res.payload) {
            alert(
              "회원가입이 완료되었습니다.\n첫 굿즈인 스티커 수령은 파란학기 굿즈바이어스 부스 또는 도서관카페에서 수령하실 수 있습니다!"
            );
            navigate("/");
          } else {
            alert("error");
          }
        });
      }
    }
  };

  const emailVeriHandler = (e) => {
    e.preventDefault();
    let body = { email: Email };
    dispatch(emailVerify(body)).then((res) => {
      if (res.payload.status === "fail") {
        alert("중복된 이메일입니다");
      } else {
        // console.log(res.payload.number);
        setVerifyNum(res.payload.number);
        setChkVerify(true);
      }
    });
  };

  const emailHandler = (e) => {
    e.preventDefault();

    // console.log(VerifyNum);
    // console.log(EmailNum);

    if (VerifyNum === parseInt(EmailNum)) {
      alert("인증이 완료되었습니다!");
      setIsChked(true);
      setChkVerify(false);
      setCompleted(true);
    } else {
      alert("인증번호가 올바르지 않습니다");
    }
  };

  return (
    <div style={{ width: "384px", margin: "0 auto" }}>
      <StyledForm onSubmit={onSubmitHandler}>
        <InputBox>
          <StyledLabel>
            <strong className="red">*</strong> 이메일
          </StyledLabel>
          <div style={{ display: "flex" }}>
            <StyledInput
              type="email"
              value={Email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              placeholder="이메일을 입력해주세요."
              required
            />
            {!Completed && (
              <StyledButton
                style={{ height: "100%", margin: "auto" }}
                onClick={emailVeriHandler}
              >
                이메일 인증
              </StyledButton>
            )}
          </div>
        </InputBox>
        {ChkVerify && (
          <InputBox>
            <StyledLabel>인증번호입력</StyledLabel>
            <div style={{ display: "flex" }}>
              <StyledInput
                placeholder="인증번호 6자리를 입력해주세요"
                onChange={(e) => {
                  setEmailNum(e.currentTarget.value);
                }}
              ></StyledInput>
              <StyledButton
                style={{ margin: "auto", height: "100%" }}
                onClick={emailHandler}
              >
                인증번호 입력
              </StyledButton>
            </div>
          </InputBox>
        )}
        {Completed && (
          <div style={{ marginTop: "10px" }}>
            ✅ 이메일 인증이 완료되었습니다.
          </div>
        )}
        <InputBox>
          <StyledLabel>
            <strong className="red">*</strong> 비밀번호
          </StyledLabel>
          <StyledInput
            type="password"
            value={Password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            placeholder="비밀번호"
          />
          <StyledInput
            type="password"
            value={ConfirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.currentTarget.value);
            }}
            placeholder="비밀번호 확인"
          />
        </InputBox>
        <InputBox>
          <StyledLabel>
            <strong className="red">*</strong> 이름
          </StyledLabel>
          <StyledInput
            type="text"
            value={Name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
            placeholder="이름"
          />
        </InputBox>
        <InputBox>
          <StyledLabel>
            <strong className="red">*</strong> 전화번호
          </StyledLabel>
          <StyledInput
            type="text"
            value={Phonenumber}
            onChange={(e) => {
              setPhonenumber(e.currentTarget.value);
            }}
            placeholder="010-1234-5678"
          />
        </InputBox>
        <InputBox>
          <StyledLabel>
            <strong className="red">*</strong> 닉네임
          </StyledLabel>
          <StyledInput
            type="text"
            value={Nickname}
            onChange={(e) => {
              setNickname(e.currentTarget.value);
            }}
            placeholder="닉네임"
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
          <StyledLabel
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <strong className="red">*</strong> 학적상태 선택
          </StyledLabel>
          <StyledSelect
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="none">=======선택=======</option>
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
        <StyledButton type="submit">회원가입하기</StyledButton>
      </StyledForm>
    </div>
  );
}

export default RegisterPage;

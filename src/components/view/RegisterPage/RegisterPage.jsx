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
      // phonenumber: Phonenumber,
      phonenumber: "",
      // nickname: Nickname,
      nickname: "",
      // status: Status,
      status: 1,
      socialtype: "local",
    };

    // console.log("body: ", body);

    // if (!isChked) alert("????????? ????????? ??????????????????");
    // else {
    if (Password !== ConfirmPassword) {
      return alert("??????????????? ???????????? ????????????!");
    } else {
      dispatch(registerUser(body)).then((res) => {
        // console.log(res);
        if (res.payload) {
          alert(
            "??????????????? ?????????????????????.\n??? ????????? ????????? ????????? ???????????? ?????????????????? ?????? ?????? ????????????????????? ???????????? ??? ????????????!"
          );
          navigate("/");
        } else {
          alert("error");
        }
      });
    }
    // }
  };

  const emailVeriHandler = (e) => {
    e.preventDefault();
    let body = { email: Email };
    dispatch(emailVerify(body)).then((res) => {
      if (res.payload.status === "fail") {
        alert("????????? ??????????????????");
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
      alert("????????? ?????????????????????!");
      setIsChked(true);
      setChkVerify(false);
      setCompleted(true);
    } else {
      alert("??????????????? ???????????? ????????????");
    }
  };

  return (
    <div style={{ width: "384px", margin: "0 auto" }}>
      <StyledForm onSubmit={onSubmitHandler}>
        <InputBox>
          <StyledLabel>
            <strong className="red">*</strong> ?????????
          </StyledLabel>
          {/* <div style={{ display: "flex" }}> */}
          <StyledInput
            type="email"
            value={Email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
            placeholder="???????????? ??????????????????."
            required
          />
          {/* {!Completed && (
              <StyledButton
                style={{ height: "100%", margin: "auto" }}
                onClick={emailVeriHandler}
              >
                ????????? ??????
              </StyledButton>
            )}
          </div> */}
        </InputBox>
        {ChkVerify && (
          <InputBox>
            <StyledLabel>??????????????????</StyledLabel>
            <div style={{ display: "flex" }}>
              <StyledInput
                placeholder="???????????? 6????????? ??????????????????"
                onChange={(e) => {
                  setEmailNum(e.currentTarget.value);
                }}
              ></StyledInput>
              <StyledButton
                style={{ margin: "auto", height: "100%" }}
                onClick={emailHandler}
              >
                ???????????? ??????
              </StyledButton>
            </div>
          </InputBox>
        )}
        {Completed && (
          <div style={{ marginTop: "10px" }}>
            ??? ????????? ????????? ?????????????????????.
          </div>
        )}
        <InputBox>
          <StyledLabel>
            <strong className="red">*</strong> ????????????
          </StyledLabel>
          <StyledInput
            type="password"
            value={Password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            placeholder="????????????"
          />
          <StyledInput
            type="password"
            value={ConfirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.currentTarget.value);
            }}
            placeholder="???????????? ??????"
          />
        </InputBox>
        <InputBox>
          <StyledLabel>
            <strong className="red">*</strong> ??????
          </StyledLabel>
          <StyledInput
            type="text"
            value={Name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
            placeholder="??????"
          />
        </InputBox>
        <InputBox>
          <StyledLabel>
            <strong className="red">*</strong> ????????????
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
            <strong className="red">*</strong> ?????????
          </StyledLabel>
          <StyledInput
            type="text"
            value={Nickname}
            onChange={(e) => {
              setNickname(e.currentTarget.value);
            }}
            placeholder="?????????"
          />
        </InputBox>
        {/* <InputBox>
          <label
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <strong className="red">*</strong> ??????
          </label>
          <StyledSelect
            onChange={(e) => {
              setSex(e.target.value);
            }}
          >
            <option value={0}>??????</option>
            <option value={1}>??????</option>
          </StyledSelect>
        </InputBox> */}
        <InputBox>
          <StyledLabel
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <strong className="red">*</strong> ???????????? ??????
          </StyledLabel>
          <StyledSelect
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="none">=======??????=======</option>
            <option value="?????????">?????????</option>
            <option value="?????????">?????????</option>
            <option value="?????????">?????????</option>
          </StyledSelect>
        </InputBox>
        {/* <InputBox>
          <label>
            <strong className="red">*</strong> ????????????
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
            <strong className="red">*</strong> ???????????? ??????
          </label>
          <div>
            <StyledSelect
              onChange={(e) => {
                setBank(e.currentTarget.value);
              }}
            >
              <option value="????????????">????????????</option>
              <option value="????????????">????????????</option>
              <option value="????????????">????????????</option>
              <option value="????????????">????????????</option>
              <option value="???????????????">???????????????</option>
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
        <StyledButton type="submit">??????????????????</StyledButton>
      </StyledForm>
    </div>
  );
}

export default RegisterPage;

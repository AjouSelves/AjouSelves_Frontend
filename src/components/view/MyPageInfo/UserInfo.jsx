import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { editUserInfo } from "../../../_actions/user_actions";

const InfoTable = styled.table`
  border-top: 1px solid #d9d9d9;

  width: 100%;
  box-sizing: border-box;

  border-collapse: collapse;
  border-spacing: 0;
`;

const StyledTh = styled.th`
  background: #f5f5f5;
  font-weight: normal;
  width: 120px;
  text-align: left;
  color: #666;

  padding: 12px 10px;
  border-bottom: 1px solid #d9d9d9;
  height: 48px;
`;

const StyledTd = styled.td`
  padding: 12px 10px;
  border-bottom: 1px solid #d9d9d9;
  height: 48px;
`;

const StyledInput = styled.input`
  background: #fff;
  font-size: 12px;
  line-height: 16px;
  border: 1px solid #acacac;
  height: 32px;
  box-sizing: border-box;
  padding: 2px 8px;
  border-radius: 2px;
`;

const StyledButton = styled.button`
  border: none;
  background: #a0a0a0;
  color: white;
  width: 140px;
  padding: 8px 15px;
  height: 32px;
  font-size: 12px;
  line-height: 14px;
  cursor: pointer;
`;

function UserInfo(props) {
  const dispatch = useDispatch();
  const info = props.props;
  // console.log(props.props);

  const [Name, setName] = useState(info.name);
  const [Email] = useState(info.email);
  const [Nickname, setNickname] = useState(info.nickname);
  const [Password, setPassword] = useState();
  const [ConfirmPassword, setConfirmPassword] = useState();
  const [Birth, setBirth] = useState(info.birth);

  const editInfo = (e) => {
    e.preventDefault();

    const login_token = window.localStorage.getItem("login-token");

    let header = {
      headers: {
        Authorization: login_token,
      },
    };

    let body = {
      email: Email,
      password: Password,
      name: Name,
      phonenumber: info.phonenumber,
      nickname: Nickname,
      status: info.status,
      socialtype: "local",
      birth: "1999-09-13",
      account: "",
      profilelink: "",
    };

    console.log(body);

    // email: Email,
    //   password: Password,
    //   name: Name,
    //   phonenumber: Phonenumber,
    //   nickname: Nickname,
    //   status: Status,
    //   socialtype: "local",

    if (Password === ConfirmPassword) {
      dispatch(editUserInfo(body, header)).then((res) => {
        console.log(res);
        if (res.payload.status === "success") {
          alert("회원정보 수정에 성공했습니다!");
        }
      });
    } else {
      alert("비밀번호확인이 올바르지 않습니다!");
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>회원 정보 관리</h2>
      <InfoTable>
        <tbody>
          <tr>
            <StyledTh>이름</StyledTh>
            <StyledTd>
              <div>
                <StyledInput
                  value={Name}
                  onChange={(e) => {
                    setName(e.currentTarget.value);
                  }}
                ></StyledInput>
              </div>
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>이메일</StyledTh>
            <StyledTd>
              <div>
                <StyledInput value={Email} readOnly></StyledInput>
              </div>
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>전화번호</StyledTh>
            <StyledTd>
              <div>
                <StyledInput value={info.phonenumber} readOnly></StyledInput>
              </div>
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>닉네임</StyledTh>
            <StyledTd>
              <div>
                <StyledInput
                  value={Nickname}
                  onChange={(e) => {
                    setNickname(e.currentTarget.value);
                  }}
                ></StyledInput>
              </div>
            </StyledTd>
          </tr>
          <tr>
            <StyledTh>비밀번호</StyledTh>
            <StyledTd>
              <div>
                <StyledInput
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                ></StyledInput>
              </div>
              <div>
                <StyledInput
                  onChange={(e) => {
                    setConfirmPassword(e.currentTarget.value);
                  }}
                ></StyledInput>
              </div>
            </StyledTd>
          </tr>
          {/* <tr>
            <StyledTh>생일</StyledTh>
            <StyledTd>
              <div>
                <StyledInput
                  value={Birth}
                  onChange={(e) => {
                    setBirth(e.currentTarget.value);
                  }}
                ></StyledInput>
              </div>
            </StyledTd>
          </tr> */}
        </tbody>
      </InfoTable>
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <StyledButton onClick={editInfo}>회원 정보 수정하기</StyledButton>
      </div>
    </div>
  );
}

export default UserInfo;

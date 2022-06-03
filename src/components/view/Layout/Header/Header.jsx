import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../../../images/logo2.png";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  position: fixed;
  align-items: center;
  justify-content: space-around;
  height: 80px;
  width: 100%;
  top: 0px;

  background-color: #24272b;

  z-index: 1;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  list-style: none;

  width: 700px;
  color: gray;
`;

const StyledLi = styled.li`
  &:hover {
    color: white;
  }
`;

const StyledP = styled.p`
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();

  const [Logined, setLogined] = useState(false);
  const chk = useSelector((state) => state.user);

  useEffect(() => {
    if (chk.loginSuccess) {
      console.log(chk.loginSuccess.token);
      setLogined(!Logined);
    } else {
      console.log("chk is null");
    }
  }, [chk.loginSuccess]);

  return (
    <StyledHeader>
      <img
        src={logo}
        width="220px"
        height="60px"
        alt=""
        onClick={() => {
          navigate("/");
        }}
        style={{ cursor: "pointer" }}
      />
      <StyledUl>
        <StyledLi>
          <StyledP
            onClick={() => {
              navigate("/goods");
            }}
          >
            구매하기
          </StyledP>
        </StyledLi>
        <StyledLi>
          <StyledP
            onClick={() => {
              navigate("/goods/add");
            }}
          >
            판매하기
          </StyledP>
        </StyledLi>
        <StyledLi>
          <StyledP
            onClick={() => {
              alert("곧 서비스 예정입니다!");
            }}
          >
            커뮤니티
          </StyledP>
        </StyledLi>
        {!Logined && (
          <StyledLi>
            <StyledP
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인/회원가입하기
            </StyledP>
          </StyledLi>
        )}
        {Logined && (
          <StyledLi>
            <StyledP
              onClick={() => {
                navigate("/mypage", { state: chk.loginSuccess.token });
              }}
            >
              마이페이지
            </StyledP>
          </StyledLi>
        )}
        {Logined && (
          <StyledLi>
            <StyledP
              onClick={() => {
                alert("로그아웃 되었습니다!");

                localStorage.clear();
                navigate("/");
                window.location.reload();
              }}
            >
              로그아웃
            </StyledP>
          </StyledLi>
        )}
      </StyledUl>
    </StyledHeader>
  );
}

export default Header;

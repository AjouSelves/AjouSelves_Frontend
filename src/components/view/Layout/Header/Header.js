import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import logo from "../../../../images/logo.png";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  position: fixed;
  align-items: center;
  justify-content: space-around;
  height: 65px;
  width: 100%;
  top: 0px;

  background-color: white;
  border-bottom: 1px solid #eeeeee;

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
    color: black;
  }
`;

const StyledP = styled.p`
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <img src={logo} width="250px" height="55px" alt="" />
      <div></div>
      <div></div>
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
        <StyledLi>
          <StyledP
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인/회원가입하기
          </StyledP>
        </StyledLi>
      </StyledUl>
    </StyledHeader>
  );
}

export default Header;

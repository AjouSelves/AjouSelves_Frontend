import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import logo from "../../../../images/logo.png";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #eeeeee;

  align-items: center;
  height: 122px;
  width: 100%;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
`;

const StyledP = styled.p`
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <img src={logo} width="300px" height="65px" alt="" />
      <StyledUl>
        <li>
          <StyledP
            onClick={() => {
              navigate("/goods/add");
            }}
          >
            굿즈 등록하기
          </StyledP>
        </li>
        <li>
          <StyledP
            onClick={() => {
              navigate("/goods");
            }}
          >
            굿즈 구매하기
          </StyledP>
        </li>
      </StyledUl>
      <StyledP>마이페이지</StyledP>
      {/* <img src={kakao_login} width="200px" height="80px" alt="" /> */}
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        login
      </button>
      <button
        onClick={() => {
          navigate("/register");
        }}
      >
        register
      </button>
    </StyledHeader>
  );
}

export default Header;

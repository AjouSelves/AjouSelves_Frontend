import React from "react";
import styled from "styled-components";

import { FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { IoCall, IoMail } from "react-icons/io5";

const StyledFooter = styled.footer`
  background-color: #333333;
  position: static;
  bottom: 0;
  width: 100%;
  height: 200px;
  color: white;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 150px;
  height: 100px;
  position: relative;
  top: 20%;
  left: 75%;
`;

const StyledIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100px;
  position: relative;
  top: 25%;
  left: 80%;
`;

const InstagramHandler = () => {
  window.open("https://www.instagram.com/goods_by_us/", "_blank");
};

const FacebookHandler = () => {
  window.open("https://www.facebook.com/GoodsByUs2022/", "_blank");
};

function Footer() {
  return (
    <StyledFooter>
      <StyledInfo>
        <div>
          <IoCall /> 전화번호
          <br />
          010-4634-1277
        </div>
        <div>
          <IoMail /> 이메일
          <br />
          ajouselves@naver.com
        </div>
      </StyledInfo>
      <StyledIcon>
        <FaInstagram
          color="#C2C2C2"
          size="35px"
          onClick={InstagramHandler}
          cursor="pointer"
        />
        <FaFacebookSquare
          color="#C2C2C2"
          size="35px"
          onClick={FacebookHandler}
          cursor="pointer"
        />
      </StyledIcon>
    </StyledFooter>
  );
}

export default Footer;

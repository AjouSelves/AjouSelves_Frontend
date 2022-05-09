import React from "react";
import styled from "styled-components";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import main_image from "../../../images/main_image.png";
import GlobalFonts from "../../../font/font";

const StyledDiv = styled.div`
  padding-top: 65px;
  display: flex;
  flex-direction: column;
`;

const MainP = styled.span`
  font-family: "S-CoreDream-9Black";

  position: absolute;
  top: 55%;
  left: 55%;

  color: white;
  font-weight: 900;
  font-size: 54px;
  text-align: right;
`;

function Layout({ children }) {
  return (
    <StyledDiv>
      <Header />
      <div style={{ position: "relative" }}>
        <div>
          <img src={main_image} alt="" width="100%" />
        </div>
        <div>
          <GlobalFonts />
          <MainP>
            '우리'가 기획하고 <br />
            '우리'가 구매하는
            <br />
            우리학교 굿즈 제작 플랫폼 <br />
            Goods By Us : 굿즈바이어스
          </MainP>
        </div>
      </div>
      <div>{children}</div>
      <Footer />
    </StyledDiv>
  );
}

export default Layout;

import React from "react";
import styled from "styled-components";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import main_image from "../../../images/main_image.png";

const StyledDiv = styled.div`
  padding-top: 65px;
`;

const MainDiv = styled.div`
  height: 100px;
`;

const MainP = styled.span`
  @font-face {
    font-family: "S-CoreDream-9Black";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-9Black.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  position: absolute;
  top: 55%;
  left: 60%;

  color: white;
  font-weight: 900;
  font-size: 54px;
  text-align: right;
`;

function Layout() {
  return (
    <StyledDiv>
      <Header />
      <div style={{ position: "relative" }}>
        <div>
          <img src={main_image} alt="" width="100%" />
        </div>
        <div>
          <MainP>
            '우리'가 기획하고 <br />
            '우리'가 구매하는
            <br />
            우리학교 굿즈 제작 플랫폼 <br />
            Goods By Us : 굿즈바이어스
          </MainP>
        </div>
      </div>
      <MainDiv>GOODS LIST</MainDiv>
      <Footer />
    </StyledDiv>
  );
}

export default Layout;

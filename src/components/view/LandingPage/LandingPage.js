import React from "react";
import styled from "styled-components";

import GlobalFonts from "../../../font/font";
import main_image from "../../../images/main_image.png";
import LandingPage0 from "../../../images/LandingPage0.png";
import LandingPage1 from "../../../images/LandingPage1.png";
import LandingPage2 from "../../../images/LandingPage2.png";

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

function LandingPage() {
  return (
    <div>
      {/* <div style={{ position: "relative" }}>
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
      </div> */}
      <div>
        <img src={LandingPage0} alt="" width="100%" />
      </div>
      <div>
        <img src={LandingPage1} alt="" width="100%" />
      </div>
      <div>
        <img src={LandingPage2} alt="" width="100%" />
      </div>
      {/* <MainDiv>GOODS LIST</MainDiv> */}
    </div>
  );
}

export default LandingPage;

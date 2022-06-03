import React from "react";
import styled from "styled-components";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import image_16 from "../../../images/image_16.png";

const StyledDiv = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
`;

function Layout({ children }) {
  return (
    <StyledDiv>
      <Header />
      {/* <img src={image_16} alt="" width="100%" /> */}
      <div>{children}</div>
      <Footer />
    </StyledDiv>
  );
}

export default Layout;

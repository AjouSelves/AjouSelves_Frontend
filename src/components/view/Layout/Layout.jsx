import React from "react";
import styled from "styled-components";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const StyledDiv = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
`;

function Layout({ children }) {
  return (
    <StyledDiv>
      <Header />
      <div>{children}</div>
      <Footer />
    </StyledDiv>
  );
}

export default Layout;

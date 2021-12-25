import React from "react";
import styled from "styled-components/macro";

import { CircularProgress } from "@mui/material";

const Root = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
  height: 80vh; 
  width: 80vw;
`;

function Loader() {
  return (
    <Root>
      <CircularProgress m={2} />
    </Root>
  );
}

export default Loader;

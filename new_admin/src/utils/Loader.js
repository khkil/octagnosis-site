import React from "react";
import { CircularProgress, Grid, styled } from "@mui/material";

const Root = styled(Grid)({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  minHeight: "100%",
  height: "80vh",
});

function Loader() {
  return (
    <Root>
      <CircularProgress m={2} />
    </Root>
  );
}

export default Loader;

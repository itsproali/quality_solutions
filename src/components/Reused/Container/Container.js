// import { styled } from "@mui/system";

import { styled } from "@mui/material";

export const Container = styled('div')({
  width: "1500px",
  margin: 'auto',
  "@media(max-width:1600px)":{
    width: '1200px',
  },
  "@media(max-width:1199px)":{
    width: '70%',
  }
})
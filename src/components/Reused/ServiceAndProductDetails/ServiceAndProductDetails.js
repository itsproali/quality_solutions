import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Container } from "../Container/Container";

const ServiceAndProductDetails = () => {
  return (
    <Container>
      <Grid container>
        <Grid item lg={6}>
          <Box
            component="img"
            src="/images/service-placeholder.png"
            alt="Service Image"
          />
        </Grid>
        <Grid item lg={6}>
          <Typography variant="body1">

          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServiceAndProductDetails;

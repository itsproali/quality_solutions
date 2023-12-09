import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { bannerText } from "../../../staticData/staticData";

const Providings = () => {
  return (
    <Container fixed sx={{ pt: 15 }} id="provide_service">
      <Typography
        variant="h4"
        sx={{
          fontSize: {
            xs: "20px",
            lg: "35px",
          },
          textAlign: "center",
          fontWeight: 600,
          mb: 4,
        }}
      >
        What we Provide
      </Typography>

      <Grid container sx={{ alignItems: "center" }} spacing={{ xs: 2, lg: 5 }}>
        <Grid
          item
          lg={6}
          xs={12}
          sx={{ textAlign: { xs: "center", lg: "inherit" } }}
        >
          <Image
            src="/images/service.svg"
            alt="service"
            width={500}
            height={500}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: {
                  xs: "16px",
                  lg: "20px",
                },
              }}
            >
              We provide the highest standard of GMP services and products
              including:
            </Typography>

            <Box component="ul">
              {bannerText.map((item) => (
                <Box component="li" key={item.id} sx={{ fontSize: "14px" }}>
                  {item.text}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Providings;

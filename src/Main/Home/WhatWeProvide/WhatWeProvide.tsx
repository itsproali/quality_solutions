import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { whatWeProvides } from "../../../staticData/whatWeProvides";
import SectionHeading from "../../../components/Reused/Section/SectionHeading";
import SectionBG from "./SectionBG";
import theme from "../../../components/theme";

const WhatWeProvide = () => {
  return (
    <>
      <SectionBG id="what-we-provide">
        <Container
          fixed
          sx={{
            py: { xs: 8, md: 16 },
            borderLeft: {
              xs: 0,
              lg: `1px solid ${theme.palette.primary.dark_hover}`,
            },
          }}
        >
          <Grid container spacing={4}>
            {/* Section Heading */}
            <Grid item xs={12} md={6} lg={4}>
              <SectionHeading
                title="What We Provide"
                color="white"
                rightSide={false}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  maxWidth: { xs: "100%", md: 350 },
                  lineHeight: 1.4,
                  mt: { xs: 5, md: 1.5 },
                }}
              >
                We provide the highest standard of GMP services and products
                including:
              </Typography>

              <Button
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  mt: 4,
                  textTransform: "capitalize",
                  fontWeight: 600,
                }}
              >
                See More
              </Button>
            </Grid>

            {whatWeProvides?.map((item, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <Box
                  sx={{
                    p: 2,
                    color: "white",
                    border: "1px solid #0065FF",
                    transition: "all 0.3s ease-in-out",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "primary.main",
                    },
                    height: "100%",
                    minHeight: 180,
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      width: 40,
                      height: 40,
                      bgcolor: "primary.dark",
                      color: "white",
                      textAlign: "center",
                      mb: 4,
                    }}
                  >
                    <Typography variant="h5">{i + 1}</Typography>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: 16, md: 21 },
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionBG>
    </>
  );
};

export default WhatWeProvide;

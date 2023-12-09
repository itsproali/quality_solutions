import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { scroller } from "react-scroll/modules";

const Banner = () => {
  const scrollTarget = (target) => scroller.scrollTo(target, { smooth: true });
  const handleExplore = () => {
    scrollTarget("what-we-provide");
  };

  return (
    <Container
      fixed
      sx={{
        pt: {
          lg: 12,
          xs: 8,
        },
        pb: 5,
        px: "none",
        borderLeft: { xs: 0, lg: "1px solid #E8E8E8" },
      }}
    >
      <Grid
        container
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          // minHeight: "70vh",
          flexDirection: {
            xs: "column-reverse",
            lg: "inherit",
          },
        }}
      >
        <Grid item lg={6} xs={12}>
          <Box
            sx={{
              // p: 2,
              color: "black",
              textAlign: {
                xs: "center",
                lg: "left",
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Box
                component="div"
                sx={{
                  width: 3,
                  height: 50,
                  bgcolor: "primary.main",
                  position: "absolute",
                  top: "50%",
                  left: -26,
                  transform: "translateY(-50%)",
                  display: {
                    xs: "none",
                    lg: "block",
                  },
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  color: "#002D73",
                  fontSize: {
                    xs: 30,
                    sm: 40,
                    md: 50,
                  },
                  fontWeight: 800,
                }}
              >
                Ultimate QA solution
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: "#002D73",
                fontSize: {
                  xs: 20,
                  md: 35,
                },
                fontWeight: 800,
                mt: 1.5,
              }}
            >
              for pharmaceuticals companies
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 500, my: 5, color: "text.secondary" }}
            >
              Tailored for pharmaceuticals, the{" "}
              <Typography
                variant="overline"
                color="primary"
                sx={{
                  display: "inline",
                  fontSize: "inherit",
                  textTransform: "none",
                  lineHeight: 1.5,
                }}
              >
                Ultimate QA Solution
              </Typography>{" "}
              is a comprehensive blends tech, automation, and compliance to
              guarantee top-quality, safe, and effective products.
            </Typography>

            <Button
              variant="contained"
              endIcon={<ArrowForwardIosIcon />}
              onClick={handleExplore}
              sx={{
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Explore more
            </Button>
          </Box>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Box
            sx={{
              // display: {
              //   xs: "none",
              //   lg: "grid",
              // },
              display: "grid",
              alignContent: "center",
              position: "relative",
            }}
          >
            <Image
              src="/images/banner.png"
              alt="Banner Image"
              width={800}
              height={780}
            />

            <Box
              component="img"
              src="/images/banner_element_1.png"
              alt="star"
              sx={{
                position: "absolute",
                top: 100,
                right: 40,
                transform: "translate(-50%, -50%)",
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            />

            <Box
              component="img"
              src="/images/banner_element_2.png"
              alt="star"
              sx={{
                position: "absolute",
                bottom: 60,
                left: 60,
                transform: "translate(-50%, -50%)",
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Banner;

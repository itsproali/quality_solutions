import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import SectionBG from "../WhatWeProvide/SectionBG";
import SectionHeading from "../../../components/Reused/Section/SectionHeading";
import Image from "next/image";
import theme from "../../../components/theme";

const About = () => {
  const aboutText = [
    // {
    //   title: "",
    //   text: `Welcome to One Quality Solutions Ltd, the leading pharmaceutical consulting company in Bangladesh. We are highly experienced in Quality Systems, Data Integrity Management, CSV, Audit & Inspection Management. We provide a wide range of services including pharmaceutical consulting, training, and GxP document and guideline development. With a commitment to excellence, we help our clients achieve their goals and ensure compliance with industry regulations. Contact us today to learn more about how we can help your organization thrive.`,
    // },
    {
      title: "Our Mission",
      text: `One Quality Solutions Ltd. is committed to providing pharmaceutical companies and professionals with high-quality services, training, and guidance on quality management systems and regulatory compliance. Our mission is to build skills and improve the quality culture of the industry, ensuring patient safety through the production of high-quality medicines.`,
      icon: "/icons/mission.png",
    },
    {
      title: "Our Vision",
      text: `Our vision is a world where all pharmaceutical companies use harmonized guidelines to produce safe and effective medicines, improving the health and well-being of patients worldwide. We strive to be the leading provider of quality management solutions, training, and guidance, empowering professionals and organizations to achieve excellence in their field.`,
      icon: "/icons/vision.png",
    },
  ];

  return (
    <>
      <Box sx={{ bgcolor: "background.secondary" }}>
        <Container
          fixed
          sx={{
            borderLeft: {
              xs: 0,
              lg: `1px solid ${theme.palette.primary.dark_hover}`,
            },
          }}
        >
          <Grid
            container
            sx={{
              height: "auto",
              // alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12} lg={6}>
              <Box sx={{ mt: 10, pr: { xs: 0, lg: 5 }, pb: { xs: 6, lg: 0 } }}>
                <SectionHeading
                  title="Who We Are"
                  rightSide={false}
                  color="white"
                />

                <Typography variant="h6" sx={{ mt: 6, color: "white" }}>
                  Welcome to One Quality Solutions Ltd, the leading
                  pharmaceutical consulting company in Bangladesh. We are highly
                  experienced in Quality Systems, Data Integrity Management,
                  CSV, Audit & Inspection Management. We provide a wide range of
                  services including pharmaceutical consulting, training, and
                  GxP document and guideline development.
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              lg={6}
              sx={{ textAlign: { xs: "center", lg: "inherit" }, py: 0, my: 0 }}
            >
              <Box
                component="img"
                src="/images/about_image_gallery.png"
                alt="about"
                height="100%"
                width="100%"
                sx={{
                  objectFit: "cover",
                  objectPosition: "center",
                  maxHeight: "100%",
                  aspectRatio: "496/637",
                  display: "bock",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "primary.dark_hover" }}>
        <Container
          fixed
          sx={{
            py: 8,
            borderLeft: {
              xs: 0,
              lg: `1px solid ${theme.palette.primary.darker}`,
            },
          }}
        >
          <Grid
            container
            spacing={6}
            sx={{
              height: "auto",
            }}
          >
            {aboutText.map((item, i) => (
              <Grid item xs={12} lg={6} key={i}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  spacing={2}
                  sx={{ mb: 3 }}
                >
                  <Box
                    component="img"
                    src={item.icon}
                    alt="icon"
                    height={30}
                    width={30}
                    sx={{
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ color: "white", fontWeight: 700 }}
                  >
                    {item.title}
                  </Typography>
                </Stack>

                <Typography variant="body1" sx={{ color: "white" }}>
                  {item.text}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default About;

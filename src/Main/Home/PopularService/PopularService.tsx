import { Box, Container, Grid, Skeleton, Tab, Tabs } from "@mui/material";
import React from "react";
import { IService } from "../../../Interfaces/Service.interface";
import SectionHeading from "../../../components/Reused/Section/SectionHeading";
import theme from "../../../components/theme";
import { useCategory } from "../../../hooks/useCategory";
import { useServices } from "../../../hooks/useServices";
import SectionBG from "../WhatWeProvide/SectionBG";
import SingleServiceCard from "./SingleServiceCard";

const PopularService = () => {
  const [category, setCategory] = React.useState("all");
  const { serviceCategory } = useCategory();
  const { data, isLoading, error } = useServices({
    category: category === "all" ? null : category,
  });
  const services = data?.data?.filter((service: IService) => service?.featured);
  const featuredServiceCategory = serviceCategory?.filter((category: any) =>
    services?.some(
      (service: IService) => service?.category?._id === category?._id
    )
  );

  const handleChangeCategory = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setCategory(newValue);
  };
  return (
    <>
      {services?.length > 0 && (
        <SectionBG>
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
            <SectionHeading
              title="Popular Services"
              rightSide={true}
              buttonVariant="contained"
              buttonLink="/services"
              color="white"
            />

            <Box
              sx={{
                maxWidth: { xs: "100%", md: 800 },
                my: 4,
              }}
            >
              <Tabs
                value={category}
                onChange={handleChangeCategory}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                color="white"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "white",
                  },
                }}
              >
                <Tab
                  label="All"
                  value="all"
                  color="white"
                  sx={{
                    color: "white",
                    textTransform: "capitalize",
                    fontWeight: 600,
                    fontSize: { xs: 16, md: 21 },
                    "&.Mui-selected": { color: "white" },
                  }}
                />
                {featuredServiceCategory?.map((category: any) => (
                  <Tab
                    color="white"
                    sx={{
                      color: "white",
                      textTransform: "capitalize",
                      fontWeight: 600,
                      fontSize: { xs: 16, md: 21 },
                      "&.Mui-selected": { color: "white" },
                    }}
                    key={category?._id}
                    label={category?.title}
                    value={category?._id}
                  />
                ))}
              </Tabs>
            </Box>

            <Grid container spacing={2}>
              {isLoading ? (
                <>
                  {[1, 2, 3].map((item: any, index: number) => (
                    <Grid
                      key={index}
                      item
                      lg={4}
                      sm={6}
                      xs={12}
                      sx={{
                        mb: 5,
                        width: {
                          xl: 350,
                          lg: 320,
                        },
                        mx: "auto",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        height={300}
                        sx={{
                          mr: 2,
                          ml: 2,
                        }}
                      />
                    </Grid>
                  ))}
                </>
              ) : (
                <>
                  {services?.map((service) => (
                    <Grid item lg={4} sm={6} xs={12} key={service?._id}>
                      <SingleServiceCard service={service} />
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Container>
        </SectionBG>
      )}
    </>
  );
};

export default PopularService;

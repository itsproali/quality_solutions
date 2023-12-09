import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IService } from "../../Interfaces/Service.interface";
import CardLoading from "../../components/Reused/CardLoading";
import CategoryFilter from "../../components/Reused/CategoryFilter/CategoryFilter";
import EmptyUI from "../../components/Reused/EmptyUI";
import TopBanner from "../../components/Reused/TopBanner/TopBanner";
import { useCategory } from "../../hooks/useCategory";
import { useServices } from "../../hooks/useServices";

const Services = () => {
  const [category, setCategory] = React.useState("all");
  const {
    data: services,
    isLoading,
    error,
  } = useServices({
    category: category === "all" ? null : category,
  });
  const { serviceCategory } = useCategory();
  return (
    <Box>
      <Container fixed sx={{ my: 16, minHeight: "57vh" }}>
        <TopBanner
          title="Services"
          description="Fuel your UX journey with a treasure trove of virtual events,
            exclusively curated for passionate practitioners."
        />

        {/* Title & Filter */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 6,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "18px", lg: "32px" },
              width: "100%",
            }}
            variant="h3"
          >
            All Services
          </Typography>
          <CategoryFilter
            category={category}
            setCategory={setCategory}
            categories={serviceCategory}
          />
        </Box>

        {/* All Services */}
        <Box>
          {isLoading ? (
            <CardLoading row={3} />
          ) : !services?.data?.length ? (
            <EmptyUI title="No Service found!" />
          ) : (
            <Grid container spacing={3}>
              {services?.data?.map((service: IService) => (
                <Grid item xs={12} sm={6} md={4} key={service?._id}>
                  <Box
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <Link href={`/services/${service?._id}`}>
                      <Box sx={{ cursor: "pointer" }}>
                        <Box
                          sx={{
                            aspectRatio: "344/234",
                            position: "relative",
                            objectFit: "contain",
                          }}
                        >
                          <Image
                            src={service?.image}
                            alt="Service Image"
                            layout="fill"
                          />
                        </Box>
                        <Typography
                          variant="h5"
                          sx={{
                            p: 2,
                            my: 2,
                            color: "text.secondary",
                            fontWeight: 800,
                            "&:hover": {
                              color: "primary.main",
                            },
                          }}
                        >
                          {service?.title}
                        </Typography>
                      </Box>
                    </Link>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Services;

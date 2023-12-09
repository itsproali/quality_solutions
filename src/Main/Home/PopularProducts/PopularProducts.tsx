import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useProducts } from "../../../hooks/useProducts";
import SingleProductCard from "./SingleProductCard";
import SectionHeading from "../../../components/Reused/Section/SectionHeading";

const PopularProduct = () => {
  const { data: products, isLoading, error } = useProducts({ featured: true });
  const [featuredProducts, setFeaturedProducts] = React.useState([]);

  // React.useEffect(() => {
  //   if (products?.result?.total > 0) {
  //     const featured = products?.result?.data?.filter(
  //       (product) => product?.featured
  //     );
  //     setFeaturedProducts(featured);
  //   }
  // }, [products]);

  return (
    <Box sx={{ bgcolor: "#F7FAFF" }}>
      {products?.result?.total > 0 && (
        <Container
          fixed
          sx={{
            py: 10,
            borderLeft: {
              xs: 0,
              lg: `1px solid #E8E8E8`,
            },
          }}
        >
          <SectionHeading
            title="Popular GxP Documents"
            rightSide={true}
            color="primary"
            buttonLink="/products"
            buttonVariant="text"
          />

          <Grid container spacing={2} sx={{ mt: 5 }}>
            {isLoading ? (
              <>
                {[1, 2, 3].map((item) => (
                  <Grid
                    key={item}
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
                {products?.result?.data?.map((product) => (
                  <Grid item lg={4} sm={6} xs={12} key={product?._id}>
                    <SingleProductCard product={product} />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default PopularProduct;

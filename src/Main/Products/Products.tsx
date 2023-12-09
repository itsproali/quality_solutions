import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CardLoading from "../../components/Reused/CardLoading";
import CategoryFilter from "../../components/Reused/CategoryFilter/CategoryFilter";
import EmptyUI from "../../components/Reused/EmptyUI";
import TopBanner from "../../components/Reused/TopBanner/TopBanner";
import { useCategory } from "../../hooks/useCategory";
import { useProducts } from "../../hooks/useProducts";
import { IProduct } from "../../Interfaces/Product.interface";
import ProductCard from "./ProductCard";

const Products = () => {
  const [category, setCategory] = React.useState("all");
  const { data: products, isLoading } = useProducts({
    category: category === "all" ? null : category,
  });
  const { productCategory } = useCategory();

  return (
    <Box>
      <Container fixed sx={{ my: 16, minHeight: "57vh" }}>
        <TopBanner
          title="GxP Documents"
          description="Fuel your UX journey with a treasure trove of virtual events, exclusively curated for passionate practitioners."
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 5,
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "18px", lg: "32px" },
              width: "100%",
            }}
            variant="h3"
          >
            All GxP Documents
          </Typography>
          <CategoryFilter
            category={category}
            setCategory={setCategory}
            categories={productCategory}
          />
        </Box>
        {isLoading ? (
          <CardLoading row={3} />
        ) : !products?.result?.total ? (
          <EmptyUI
            title="Currently there's no documents available
          at this moment."
            img="/icons/empty_document.png"
          />
        ) : (
          <Grid container spacing={3}>
            {products?.result?.data?.map((product: IProduct) => (
              <Grid item lg={4} sm={6} xs={12} key={product?._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Products;

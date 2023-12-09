import { Box, Container, Grid, NoSsr, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SingleProduct from "../../src/Main/Home/PopularProducts/SingleProductCard";
import SingleService from "../../src/Main/Home/PopularService/SingleServiceCard";
import { useCategoryById } from "../../src/hooks/useCategoryById";
import authFetch from "../../src/services/AxiosCommon";

const CategoryPage = () => {
  const [items, setItems] = useState<any>([]);
  const router = useRouter();
  const { id, type } = router.query;
  const { data: category } = useCategoryById(id as string);

  useEffect(() => {
    if (id && type) {
      authFetch
        .get(`/api/v1/${type}/category/${id}`)
        .then((res) => {
          setItems(res.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }, [id, type]);

  return (
    <div>
      <Container
        fixed
        sx={{
          mt: 20,
          minHeight: "68vh",
        }}
      >
        {items?.length > 0 ? (
          <>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
              }}
            >
              {category?.data?.title}
            </Typography>
            {type === "product" ? (
              <Grid container spacing={2} sx={{ mt: 5 }}>
                {items?.map((product: any) => (
                  <SingleProduct key={product?._id} product={product} />
                ))}
              </Grid>
            ) : (
              <Grid container sx={{ mt: 5 }} spacing={2}>
                {items?.map((service: any) => (
                  <SingleService key={service?._id} service={service} />
                ))}
              </Grid>
            )}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "67vh",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              No {type} found in {category?.data?.title}
            </Typography>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default CategoryPage;

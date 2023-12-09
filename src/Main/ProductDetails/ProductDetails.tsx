import { Button, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import RelatedItemCard from "../../components/Reused/ViewDetails/RelatedItemCard";
import ViewDetails from "../../components/Reused/ViewDetails/ViewDetails";
import { useMyDocument } from "../../hooks/useOrder";
import { useProduct } from "../../hooks/useProducts";
import { useRecommendedProducts } from "../../hooks/useRecommendedProducts";
import { IProduct } from "../../Interfaces/Product.interface";

const ProductDetails = ({ data }: { data: IProduct }) => {
  const [isPurchased, setIsPurchased] = useState(false);
  const { data: productData } = useProduct(data?._id);
  const { data: recommendedProducts } = useRecommendedProducts({
    id: data?._id,
    page: 1,
  });
  const { data: myDocuments } = useMyDocument();

  // setting isPurchased
  useEffect(() => {
    if (myDocuments?.length > 0) {
      setIsPurchased(
        myDocuments?.some(
          (document: any) => document?.product?._id === data?._id
        )
      );
    }
  }, [data, myDocuments]);

  return (
    <>
      <Container fixed sx={{ py: 16 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={9}>
            <ViewDetails
              singleData={data}
              type="document"
              price_bdt={productData?.price_bdt}
              price_usd={productData?.price_usd}
              isPurchased={isPurchased}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            {recommendedProducts?.total > 0 && (
              <>
                <Typography sx={{ fontWeight: 800, fontSize: 16 }} variant="h4">
                  Related Products
                </Typography>

                <Grid container spacing={2} sx={{ mt: 1.5 }}>
                  {recommendedProducts?.data
                    ?.slice(0, 4)
                    ?.map((product: IProduct) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={12}
                        key={product?._id}
                      >
                        <RelatedItemCard
                          item={product}
                          link={`/products/${product?._id}`}
                          type="document"
                        />
                      </Grid>
                    ))}
                </Grid>

                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: 2,
                    color: "text.secondary",
                    fontWeight: 600,
                  }}
                >
                  <Link href="/products">See More</Link>
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductDetails;

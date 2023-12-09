import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";
import { useMyDocument } from "../../hooks/useOrder";
import authFetch from "../../services/AxiosCommon";
import isSameType from "../../utils/isSameType";

type IProps = {
  singleData: any;
  type: string;
  price_usd?: number | string;
  price_bdt?: number | string;
};

export const SingleDetails = ({
  singleData,
  type,
  price_usd,
  price_bdt,
}: IProps) => {
  const { data: cartItems } = useCart();
  const { data: myDocuments } = useMyDocument();
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [ispurchased, setIsPurchased] = useState(false);
  const queryClient = useQueryClient();

  // Fetch the data from the API
  // const { data: productData } = useProduct(
  //   singleData?._id,
  //   type === "document" ? false : true
  // );

  useEffect(() => {
    if (myDocuments?.length > 0) {
      setIsPurchased(
        myDocuments?.some(
          (document: any) => document?.product?._id === singleData?._id
        )
      );
    }
  }, [singleData, myDocuments]);

  const handleAddToCart = async (item) => {
    if (session?.accessToken) {
      const cartItem = {
        user: session?.user._id,
        product: type === "document" ? item._id : undefined,
        book: type === "book" ? item._id : undefined,
        price: item.price,
        type: type,
      };

      if (!isSameType(cartItems, type)) {
        return;
      }

      try {
        setLoading(true);
        const response = await authFetch.post("/api/v1/cart", cartItem, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        if (response.status === 201) {
          toast.success("Added to cart");
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error?.response?.data);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please login first");
    }
  };

  return (
    <Box
      sx={{
        mt: 8,
        mb: 16,
        py: 3,
        px: { xs: 1.5, sm: 5 },
        boxShadow: "0 0 10px lightgray",
        borderRadius: 2,
      }}
    >
      <Button
        sx={{
          textTransform: "capitalize",
          fontSize: "1rem",
          fontWeight: 600,
          // ml: 7,
        }}
        onClick={() => router.back()}
        variant="outlined"
        startIcon={<KeyboardBackspaceIcon sx={{ fontSize: "1.5rem" }} />}
      >
        Back
      </Button>
      <Grid container spacing={2}>
        <Grid item lg={5} xs={12}>
          <Box
            sx={{
              mt: 8,
              textAlign: "center",
              ml: 7,
            }}
          >
            <Box
              sx={{
                borderRadius: "10px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                aspectRatio: "768/513",
                position: "relative",
              }}
            >
              <Image
                src={singleData?.image}
                alt={singleData?.title}
                layout="fill"
                blurDataURL={singleData?.image}
                placeholder="blur"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item lg={7} xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ml: 0,
              my: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { lg: "30px", xs: "22px" },
                    fontWeight: "600",
                    pt: 3,
                  }}
                >
                  {singleData?.title}
                </Typography>

                <Typography
                  my={1.5}
                  sx={{
                    fontSize: { sm: "20px", xs: "16px" },
                  }}
                >
                  {singleData?.category?.title}
                </Typography>

                {/* <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Rating
                    name="text-feedback"
                    value={3.5}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Typography
                    sx={{
                      fontSize: { lg: "16px", sm: "14px", xs: "12px" },
                      fontWeight: 600,
                      ml: 1,
                    }}
                  >
                    (3.5)
                  </Typography>
                </Box> */}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 2,
                  flexWrap: "wrap",
                  mt: 2,
                }}
              >
                {!singleData?.shouldContact && (
                  <>
                    {!singleData?.isFree ? (
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          // mt: 2,
                          color: "primary.dark",
                        }}
                      >
                        ${price_usd || singleData?.price_usd} or ৳
                        {price_bdt || singleData?.price_bdt}
                      </Typography>
                    ) : (
                      <Typography
                        variant="h5"
                        px={2}
                        sx={{
                          fontWeight: 600,
                          color: "primary.main",
                        }}
                      >
                        Free
                      </Typography>
                    )}
                  </>
                )}
                {singleData?.shouldContact ? (
                  <Link href="mailto:info@1qualitysolutions.com">
                    <a target="_blank">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <Button
                          sx={{
                            // mt: 2,
                            textTransform: "capitalize",
                            fontSize: "1rem",
                            fontWeight: 600,
                          }}
                          variant="contained"
                          color="primary"
                        >
                          Contact Us
                        </Button>
                      </Box>
                    </a>
                  </Link>
                ) : ispurchased ? (
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={true}
                    sx={{ cursor: "not-allowed" }}
                  >
                    Purchased
                  </Button>
                ) : singleData?.isFree ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      router.push(`/free-documents/${singleData?._id}`)
                    }
                  >
                    Read Now
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleAddToCart({
                        _id: singleData?._id,
                        price: singleData?.price_bdt,
                      });
                    }}
                    disabled={loading}
                    sx={{
                      opacity: loading ? 0.5 : 1,
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 7,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { md: "20px", xs: "16px" },
            fontWeight: "600",
            // pb: 3,
          }}
        >
          Description
        </Typography>

        <Box
          sx={{
            // mt: 5,
            fontSize: "1rem",
            textAlign: "justify",
            "& a": {
              color: "primary.main",
              // textDecoration: "underline",
            },
          }}
          dangerouslySetInnerHTML={{ __html: singleData?.description }}
        />
      </Box>
    </Box>
  );
};

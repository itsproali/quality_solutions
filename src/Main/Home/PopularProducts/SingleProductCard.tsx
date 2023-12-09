import EastIcon from "@mui/icons-material/East";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { IProduct } from "../../../Interfaces/Product.interface";
import { useCart } from "../../../hooks/useCart";
import { useMyDocument } from "../../../hooks/useOrder";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import isSameType from "../../../utils/isSameType";
import authFetch from "../../../services/AxiosCommon";
import { toast } from "react-toastify";

const SingleProductCard = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const { data: cartItems } = useCart();
  const { data: myDocuments } = useMyDocument();
  const { data: session } = useSession();
  const [isPurchased, setIsPurchased] = useState(false);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (myDocuments?.length > 0) {
      setIsPurchased(
        myDocuments?.some(
          (document: any) => document?.product?._id === product?._id
        )
      );
    }
  }, [product, myDocuments]);

  const handleAddToCart = async (item) => {
    if (session?.accessToken) {
      const cartItem = {
        user: session?.user._id,
        product: product?._id,
        price: item.price,
        type: "document",
      };

      if (!isSameType(cartItems, "document")) {
        return;
      }

      try {
        setIsLoading(true);
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
        setIsLoading(false);
      }
    } else {
      toast.error("Please login first");
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        p: 1.5,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          aspectRatio: "344/234",
          objectFit: "contain",
          borderRadius: "16px",
        }}
        image={product?.thumbnail}
        alt={product?.title}
      />
      <CardContent sx={{ my: 0.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
          }}
        >
          {product?.title}
        </Typography>
      </CardContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 2,
          mx: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          {product?.price_usd ? (
            `$${product.price_usd} or ৳${product.price_bdt}`
          ) : (
            <Box
              role="free_text"
              component="span"
              sx={{
                px: 2,
                py: 1,
                bgcolor: "#e0bf48",
                borderRadius: "10px",
                color: "text.secondary",
              }}
            >
              Free
            </Box>
          )}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "flex-end",
            overflow: "hidden",
            borderRadius: 5,
            textTransform: "none",
            bgcolor: "transparent",
            boxShadow: "none",
            border: "1px solid",
            borderColor: "primary.main",
            "& .label": {
              maxWidth: 0,
              opacity: 0,
              maxHeight: 0,
              whiteSpace: "nowrap",
              transition: ".2s",
            },
            "& .icon": {
              transition: ".2s",
              color: "primary.main",
            },
            "&:hover": {
              "& .label": {
                maxWidth: 100,
                opacity: 1,
                maxHeight: 100,
              },
              "& .icon": {
                color: "white",
                transform: "translateX(5px)",
              },
            },
          }}
          onClick={() => router.push("/products/" + product?._id)}
        >
          <Typography
            className="label"
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "white",
              mr: 1,
            }}
          >
            View Details
          </Typography>

          <EastIcon className="icon" />
        </Button>
      </Box>

      <CardActions>
        {isPurchased ? (
          <Button
            variant="contained"
            color="primary"
            disabled={true}
            sx={{
              cursor: "not-allowed",
              fontWeight: 600,
              textTransform: "none",
            }}
            fullWidth
          >
            Purchased
          </Button>
        ) : product?.isFree ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push(`/free-documents/${product?._id}`)}
            sx={{ fontWeight: 600, textTransform: "none" }}
            fullWidth
          >
            Read Now
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              handleAddToCart({
                _id: product?._id,
                price: product?.price_bdt,
              });
            }}
            disabled={isLoading}
            sx={{ fontWeight: 600, textTransform: "none" }}
          >
            Add To Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default SingleProductCard;

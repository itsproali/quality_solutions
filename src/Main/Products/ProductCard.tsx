import Link from "next/link";
import { IProduct } from "../../Interfaces/Product.interface";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "grey.300",
        p: { xs: 1, md: 2 },
        borderRadius: 4,
        height: "100%",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <Link href={`/products/${product?._id}`}>
        <Box sx={{ cursor: "pointer" }}>
          <Box
            sx={{
              aspectRatio: "344/234",
              position: "relative",
              objectFit: "contain",
            }}
          >
            <Image
              style={{ borderRadius: "16px" }}
              src={product?.image}
              alt="Document Image"
              layout="fill"
            />
          </Box>

          {product?.isFree ? (
            <Box
              sx={{
                my: 2,
                px: 1,
                py: 0.5,
                bgcolor: "#E7F8F0",
                color: "success.main",
                borderRadius: "4px",
                width: "fit-content",
                display: "grid",
                placeContent: "center",
                fontWeight: 700,
              }}
            >
              Free
            </Box>
          ) : (
            <Typography
              variant="h5"
              sx={{ my: 2, fontWeight: 700, color: "primary.main" }}
            >
              ৳{product?.price_bdt}
            </Typography>
          )}

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: "text.secondary",
              fontWeight: 800,
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            {product?.title}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default ProductCard;

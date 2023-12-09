import { Box, Typography } from "@mui/material";

const ProductBanner = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 200, 0.6), rgba(117, 19, 93, 0.6)), url('/images/product_banner.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "300px",
          maxHeight: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Typography
          variant="subtitle1"
          sx={{
            textTransform: "uppercase",
            letterSpacing: 2,
            color: "white",
            fontWeight: 600,
          }}
        >
          Products
        </Typography> */}

        <Typography
          variant="h4"
          sx={{
            textTransform: "uppercase",
            color: "white",
            fontWeight: 600,
          }}
        >
          GXP Document
        </Typography>
      </Box>
    </>
  );
};

export default ProductBanner;

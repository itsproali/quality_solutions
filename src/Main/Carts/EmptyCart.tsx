import { Paper, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const EmptyCart = () => {
  const router = useRouter();
  return (
    <>
      <Paper
        sx={{
          p: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          boxShadow: "none",
        }}
      >
        <Image
          src={"/icons/empty_cart.png"}
          alt="empty"
          width={150}
          height={150}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          Your cart is empty.
        </Typography>
        <Button
          size="large"
          variant="contained"
          sx={{ mt: 2, px: 12 }}
          onClick={() => router.push("/")}
        >
          Browse Products
        </Button>
      </Paper>
    </>
  );
};

export default EmptyCart;

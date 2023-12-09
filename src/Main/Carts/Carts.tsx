import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import OrderSummary from "../../components/Reused/OrderSummary/OrderSummary";
import { useCart } from "../../hooks/useCart";
import CartList from "./CartList";
import CartPromoCode from "./CartPromoCode";
import EmptyCart from "./EmptyCart";

const Carts = () => {
  const { data: cartItems, isLoading, isFetching } = useCart();
  const router = useRouter();

  return (
    <Container
      fixed
      sx={{
        my: 16,
        minHeight: "67vh",
      }}
    >
      <Grid container spacing={2}>
        {/* <Grid item xs={12} md={cartItems?.length ? 8.5 : 12}> */}
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              My Cart
            </Typography>

            {/* {cartItems?.length ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      selected?.length === cartItems?.length
                        ? true
                        : false || false
                    }
                    onChange={() =>
                      setSelected(selected?.length ? [] : cartItems)
                    }
                  />
                }
                label={`Select All Items (${cartItems?.length})`}
              />
            ) : null} */}
          </Stack>
          <Box
            sx={{
              mt: 5,
            }}
          >
            {cartItems?.length === 0 ? (
              <EmptyCart />
            ) : (
              <CartList cartItems={cartItems} />
            )}
          </Box>
        </Grid>
      </Grid>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{display: cartItems?.length ? "flex" : "none"}}>
        <Button
          size="large"
          variant="contained"
          sx={{ mt: 2, px: 4, width: { xs: "100%", md: 400 } }}
          onClick={() => router.push("/checkout")}
        >
          Proceed Checkout
        </Button>
      </Stack>
    </Container>
  );
};

export default Carts;

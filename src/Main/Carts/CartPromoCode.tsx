import { Box, Typography, Stack, Button } from "@mui/material";
import { useState } from "react";

const CartPromoCode = () => {
  const [promoCode, setPromoCode] = useState<string>("");
  return (
    <>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 1,
          boxShadow: "1px 1px 4px rgba(0,0,0,0.1)",
          p: { xs: 2, md: 3 },
          mt: { xs: 2, md: 10 },
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Enter a promo code
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
          You can add a VIP Discount or Promo Code here
        </Typography>

        <Stack direction="row">
          <StyledInput
            placeholder="Enter a Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!promoCode}
            sx={{
              borderRadius: "0 1px 1px 0",
              px: 4,
            }}
          >
            Apply
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default CartPromoCode;

const StyledInput = ({ ...attributes }) => {
  return (
    <Box
      component="input"
      sx={{
        fontWeight: 500,
        outline: "none",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "1px 0 0 1px",
        p: 1.5,
        width: "100%",
        fontFamily: "inherit",
      }}
      {...attributes}
    />
  );
};

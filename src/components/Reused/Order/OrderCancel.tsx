import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const OrderCancel = () => {
  const router = useRouter();

  return (
    <Container maxWidth="xl" sx={{ py: 20, minHeight: "80vh" }}>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Box sx={{ textAlign: "center" }}>
          <Image
            src="/images/cancel.png"
            alt="Order Cancel"
            width={350}
            height={350}
          />
        </Box>

        <Typography variant="h6">
          Sorry, your order has been cancelled.
        </Typography>

        <Typography variant="body1" sx={{ maxWidth: 500, mt: 2, mb: 4 }}>
          Your order has been cancelled. Please contact us if you have any
          questions or concerns.
        </Typography>

        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          sx={{ mt: 5 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push(`/`)}
          >
            Back to Home
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default OrderCancel;

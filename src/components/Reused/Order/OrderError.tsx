import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const OrderError = () => {
  const router = useRouter();
  const id = router.query.id;

  return (
    <Container maxWidth="xl" sx={{ py: 20, minHeight: "80vh" }}>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Box sx={{ textAlign: "center" }}>
          <Image
            src="/images/error.png"
            alt="Order Error"
            width={350}
            height={350}
          />
        </Box>

        <Typography variant="h6">
          Sorry! Your payment was not successful.
        </Typography>

        <Typography variant="body1" sx={{ maxWidth: 500, mt: 2, mb: 4 }}>
          Please try again later.
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
            onClick={() => router.push(`/payment?id=${id}`)}
          >
            Make Payment
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default OrderError;

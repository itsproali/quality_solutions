import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import DeleteModal from "../src/components/Reused/DeleteModal";
import OrderSummary from "../src/components/Reused/OrderSummary/OrderSummary";
import { useLatestOrder } from "../src/hooks/useOrder";
import { OrderService } from "../src/services/OrderService";

function MakePayment() {
  const router = useRouter();
  const { data: order } = useLatestOrder();

  const [openDelete, setOpenDelete] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // Cancel Order Api
  const { mutateAsync, isLoading } = useMutation(
    () => OrderService.cancelOrder(session?.accessToken, order?._id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["latest-order"] });
        setOpenDelete(false);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );

  // Cancel Pending Order
  const handleCancelOrder = async () => {
    if (order?.status !== "Pending")
      return toast.error("This order cannot be canceled.");
    await mutateAsync();
  };

  return (
    <>
      <Container
        fixed
        sx={{
          mt: 15,
          mb: 12,
          minHeight: "65vh",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 4 }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            fontSize={{ xs: 24, md: 32 }}
          >
            Order Details
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            gap={2}
            sx={{
              color:
                order?.status === "Pending"
                  ? "warning.main"
                  : order?.status === "Completed"
                  ? "success.main"
                  : "error.main",
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Order Status:
            </Typography>

            <Typography
              variant="body1"
              fontWeight={600}
              sx={{
                px: 2,
                py: 1,
                bgcolor:
                  order?.status === "Pending"
                    ? "warning.lighter"
                    : order?.status === "Completed"
                    ? "success.lighter"
                    : "error.lighter",
                borderRadius: 5,
              }}
            >
              {order?.status}
            </Typography>
          </Stack>
        </Stack>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: 3,
                boxShadow: "1px 1px 4px rgba(0,0,0,0.1)",
                p: { xs: 2, md: 3 },
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Your Information
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" fontWeight={600}>
                {order?.name}
              </Typography>
              <Typography variant="body1" fontWeight={500} sx={{ my: 0.5 }}>
                {order?.email}
              </Typography>
              <Typography variant="body1" fontWeight={500} sx={{ my: 0.5 }}>
                {order?.phone}
              </Typography>
              <Typography variant="body1" fontWeight={500} sx={{ my: 0.5 }}>
                {order?.address}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <OrderSummary
              title="Product Summary"
              items={order?.orderItems}
              sx={{ borderRadius: 3 }}
            />

            <Button
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              onClick={() => router.push(`/payment?id=${order?._id}`)}
              disabled={order?.status !== "Pending"}
              sx={{ my: 2, fontWeight: 700 }}
            >
              Make Payment
            </Button>
            <Button
              fullWidth
              variant="text"
              size="large"
              color="error"
              onClick={() => setOpenDelete(true)}
              sx={{
                border: "1px solid",
                borderColor: "error.main",
                fontWeight: 700,
                display: order?.status === "Pending" ? "flex" : "none",
              }}
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress />}
            >
              Cancel Order
            </Button>
          </Grid>
        </Grid>
      </Container>
      <DeleteModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        title="Are you sure you want to cancel this order?"
        handleDelete={handleCancelOrder}
      />
    </>
  );
}

export default MakePayment;

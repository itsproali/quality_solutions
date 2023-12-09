import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import DeleteModal from "../../components/Reused/DeleteModal";
import { OrderService } from "../../services/OrderService";

type OrderDetailsProps = {
  open: boolean;
  onClose: () => void;
  selectedOrder: any;
};

const OrderDetails = ({ open, onClose, selectedOrder }: OrderDetailsProps) => {
  const { _id, name, email, status, orderType, orderItems, createdAt } =
    selectedOrder || {};

  const [openDelete, setOpenDelete] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // Cancel Order Api
  const { mutate, isLoading } = useMutation(
    () => OrderService.cancelOrder(session?.accessToken, _id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["order"] });
        // refetchOrders();
        setOpenDelete(false);
        onClose();
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );

  // Cancel Pending Order
  const handleCancelOrder = () => {
    if (status !== "Pending") return toast.error("Order is not pending!");
    mutate();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Order Details
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon color="warning" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell align="left">{name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell align="left">{email}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Payment Status</TableCell>
              <TableCell align="left">
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      status === "Pending"
                        ? "#f0ad4e"
                        : status === "Completed"
                        ? "#4BB543"
                        : "red",
                  }}
                >
                  {status}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Order Date</TableCell>
              <TableCell align="left">
                {moment(createdAt).format("DD MMM YYYY")}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Order Type</TableCell>
              <TableCell align="left">{orderType}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Box sx={{ mt: 6 }}>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Products
            </Typography>
          </Box>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Quantity
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Price
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orderItems?.map((item: any) => (
                <TableRow key={item?._id}>
                  <TableCell>
                    {item?.product?.title ||
                      item?.course?.title ||
                      item?.book?.title}
                  </TableCell>
                  <TableCell align="center">1</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                    }}
                  >
                    <strong>৳</strong>
                    {item?.price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DialogContent>

      <DialogActions>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
          sx={{ m: 2 }}
        >
          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick={() => router.push(`/payment?id=${_id}`)}
            sx={{
              display: status === "Pending" ? "flex" : "none",
            }}
          >
            Payment
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="warning"
            onClick={() => setOpenDelete(true)}
            sx={{
              display: status === "Pending" ? "flex" : "none",
            }}
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress />}
          >
            Cancel Order
          </Button>
          <Button
            variant="contained"
            color="error"
            size="medium"
            onClick={onClose}
            sx={{
              display: status !== "Pending" ? "flex" : "none",
            }}
          >
            Close
          </Button>
        </Stack>
      </DialogActions>
      <DeleteModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        title="Are you sure you want to cancel this order?"
        handleDelete={handleCancelOrder}
      />
    </Dialog>
  );
};

export default OrderDetails;

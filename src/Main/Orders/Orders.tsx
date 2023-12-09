import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import TableLoading from "../../components/Reused/Loading/TableLoading";
import { useOrder } from "../../hooks/useOrder";
import OrderDetails from "./OrderDetails";
import { useRouter } from "next/router";
import OrderSuccessModal from "./OrderSuccessModal";
import OrderFailedModal from "./OrderFailedModal";

const filters = ["All", "Success", "Pending", "Cancelled"];

const Orders = () => {
  const router = useRouter();
  const isSuccess = router?.query?.success === "true";
  const isFailed = router?.query?.success === "false";
  const [successOpen, setSuccessOpen] = useState<boolean>(isSuccess);
  const [failedOpen, setFailedOpen] = useState<boolean>(isFailed);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<any>({});
  const [filter, setFilter] = useState<string>("All");
  const { data: orders, isLoading } = useOrder({
    status: filter === "All" ? "" : filter === "Success" ? "Completed" : filter,
  });

  const handleInfo = (order: any) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const filteredOrders = orders?.orders?.filter((item: any) => {
    if (filter === "All") return item;
    else if (filter === "Success") return item?.status === "Completed";
    else return item?.status === filter;
  });

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="flex-start"
        spacing={2}
        sx={{ mb: 5 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Order History
        </Typography>
      </Stack>

      {/* Order Filter */}
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{ mb: 3 }}
      >
        {filters?.map((item: string) => (
          <Button
            key={item}
            variant="outlined"
            onClick={() => setFilter(item)}
            sx={{
              borderRadius: 10,
              borderColor: item === filter ? "primary.main" : "grey.300",
              color: item === filter ? "primary.main" : "grey.500",
              fontWeight: item === filter ? 600 : 400,
              bgcolor: item === filter ? "primary.lighter" : "transparent",
              py: 0.25,
            }}
          >
            {item}
          </Button>
        ))}
      </Stack>

      {/* Orders Table */}
      <TableContainer
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "grey.300",
        }}
      >
        <Table size="small">
          <TableHead
            sx={{ borderBottom: "1px solid", borderColor: "grey.300" }}
          >
            <TableRow
              sx={{
                "& th": { borderBottom: "1px solid", borderColor: "grey.300" },
              }}
            >
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableLoading />
            ) : orders?.total === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    No Orders Found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {filteredOrders?.map((item: any) => (
                  <TableRow
                    key={item._id}
                    sx={{
                      "& th, & td": { py: 1.5 },
                      "&:last-child td, &:last-child th": { borderBottom: 0 },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: 500 }}
                    >
                      {moment(item?.createdAt).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {item?.orderItems[0]?.product?.title?.slice(0, 30) ||
                        item?.orderItems[0]?.course?.title?.slice(0, 30) ||
                        item?.orderItems[0]?.book?.title?.slice(0, 30)}
                    </TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {item?.orderType}
                    </TableCell>
                    <TableCell>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: 10,
                          border: "1px solid",
                          borderColor:
                            item?.status === "Pending"
                              ? "warning.main"
                              : item?.status === "Completed"
                              ? "success.main"
                              : "error.main",
                          color:
                            item?.status === "Pending"
                              ? "warning.main"
                              : item?.status === "Completed"
                              ? "success.main "
                              : "error.main",

                          bgcolor:
                            item?.status === "Pending"
                              ? "warning.lighter"
                              : item?.status === "Completed"
                              ? "success.lighter "
                              : "error.lighter",
                        }}
                      >
                        {item?.status === "Completed"
                          ? "Success"
                          : item?.status}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        title="View Details"
                        onClick={() => handleInfo(item)}
                      >
                        <InfoIcon color="info" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <OrderDetails
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedOrder={selectedOrder}
      />

      <OrderSuccessModal
        open={successOpen}
        handleClose={() => setSuccessOpen(false)}
      />

      <OrderFailedModal
        open={failedOpen}
        handleClose={() => setFailedOpen(false)}
      />
    </Box>
  );
};

export default Orders;

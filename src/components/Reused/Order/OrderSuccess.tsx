import {
  Box,
  Button,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const OrderSuccess = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState({
    address: "Sarulia, Demra",
    city: "Dhaka",
    createdAt: "2023-09-05T17:12:07.188Z",
    email: "ali.quality2023@gmail.com",
    name: "Mohammad Ali",
    orderItems: [
      {
        book: {
          _id: "64db9a077a0f58ff0a8a0fb1",
          title: "New Science Book",
          id: "64db9a077a0f58ff0a8a0fb1",
        },
        createdAt: "2023-08-23T16:06:36.578Z",
        price: 4500,
        type: "book",
        updatedAt: "2023-08-23T16:06:36.578Z",
        user: { _id: "6451d389347f40889bc4288d", name: "Mohammad Ali" },
        _id: "64e62e8c8d60f3132d55e8b3",
      },
    ],
    orderType: "book",
    phone: "01884622861",
    postalCode: "1361",
    sessionKey: "BB0DACA34992674970906F6D1578DF02",
    status: "Completed",
    transId: "_efob00rc41693933927117",
    updatedAt: "2023-09-05T17:12:53.178Z",
    user: "6451d389347f40889bc4288d",

    _id: "64f76167a4935aa80d5f92d7",
  });

  const { _id, name, email, status, orderType, orderItems, createdAt } =
    orderData || {};
  return (
    <Container maxWidth="xl" sx={{ py: 20, minHeight: "80vh" }}>
      <Stack
        spacing={{ xs: 6 }}
        direction={{ xs: "column", md: "row" }}
        // alignItems="center"
        justifyContent="space-evenly"
      >
        <Box>
          <Box sx={{ textAlign: "center" }}>
            <Image
              src="/images/order_success.svg"
              alt="Order Success"
              width={350}
              height={350}
            />
          </Box>

          <Typography variant="h6">Thank you for your purchase!</Typography>

          <Typography variant="body1" sx={{ maxWidth: 500, mt: 2, mb: 4 }}>
            Your order is currently being processed. You will receive an email
            confirmation shortly.
          </Typography>

          {/* <Button variant="contained" color="primary">
            Continue Shopping
          </Button> */}

          <Stack
            direction="row"
            justifyContent="flex-start"
            spacing={2}
            sx={{ mt: 5 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/my-documents")}
            >
              My Documents
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push("/my-courses")}
            >
              My Courses
            </Button>
          </Stack>
        </Box>

        <Box sx={{ width: { xs: "100%", md: 600 }, pt: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Order Summary
          </Typography>
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
        </Box>
      </Stack>
    </Container>
  );
};

export default OrderSuccess;

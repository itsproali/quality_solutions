import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Checkbox, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import DeleteModal from "../../components/Reused/DeleteModal";
import authFetch from "../../services/AxiosCommon";

type IProps = {
  cartItems: any;
};

const CartList = ({ cartItems }: IProps) => {
  // State and hooks
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState("");
  const total = cartItems?.reduce(
    (acc: number, item: any) => acc + item?.price,
    0
  );

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // handle select
  // const isSelected = (id: string) => {
  //   const result = selected?.find((item: any) => item?._id === id);
  //   return result ? true : false;
  // };

  // const handleChangeSelect = (checked: boolean, newItem: any) => {
  //   if (checked) {
  //     setSelected([...selected, newItem]);
  //   } else {
  //     setSelected(selected.filter((item: any) => item?._id !== newItem?._id));
  //   }
  // };

  // handle delete
  const handleDelete = async () => {
    if (!session?.accessToken)
      return toast.error("Please login to delete item");
    try {
      const response = await authFetch.delete(`/api/v1/cart/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      if (response) {
        toast.success("Item deleted successfully");
        setOpenDelete(false);
        queryClient.invalidateQueries(["cart"]);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 1,
          boxShadow: "1px 2px 5px 1px rgba(0,0,0,0.1)",
          py: 1,
          px: 3,
        }}
      >
        {cartItems?.map((item: any) => (
          <Box
            key={item?._id}
            sx={{
              py: 3,
              borderBottom: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* <Checkbox size="small" /> */}
              <Image
                src={
                  item?.product?.thumbnail ||
                  item?.course?.thumbnail ||
                  item?.book?.thumbnail ||
                  "/images/placeholder.png"
                }
                alt={item?.title}
                width={120}
                height={120}
                style={{
                  borderRadius: "10px",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  ml: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: 18, md: 21 }, fontWeight: 800 }}
                >
                  {item?.product?.title ||
                    item?.course?.title ||
                    item?.book?.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: { xs: 12, md: 16 },
                    fontWeight: 500,
                  }}
                >
                  Type: {item?.type}
                </Typography>

                <Stack
                  direction="row"
                  alignItems="flex-end"
                  spacing={1}
                  sx={{ mt: 2 }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    BDT
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      lineHeight: 1.2,
                      fontSize: { xs: 18, md: 24 },
                      fontWeight: 700,
                    }}
                  >
                    {item?.price}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 3,
              }}
            >
              {/* Quantity Controls */}
              {/* <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  overflow: "hidden",
                  "& button": {
                    color: "text.primary",
                    minWidth: 40,
                    p: 0.75,
                  },
                }}
              >
                <Button variant="text">
                  <RemoveIcon />
                </Button>
                <input
                  type="text"
                  style={{
                    outline: "none",
                    border: "none",
                    width: "15px",
                    textAlign: "center",
                    padding: 0,
                  }}
                  value={item?.quantity || 1}
                />
                <Button variant="text">
                  <AddIcon />
                </Button>
              </Stack> */}

              <Button
                variant="text"
                color="error"
                sx={{ fontWeight: 500 }}
                startIcon={<DeleteOutlineIcon />}
                onClick={() => {
                  setOpenDelete(true);
                  setId(item?._id);
                }}
              >
                Remove
              </Button>
            </Box>
          </Box>
        ))}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 4 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Subtotal
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              BDT
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {total}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <DeleteModal
        open={openDelete}
        handleClose={() => {
          setOpenDelete(false);
        }}
        handleDelete={handleDelete}
        title="Are you sure you want to remove this item?"
      />
    </>
  );
};

export default CartList;

import { Box, Divider, Stack, SxProps, Typography } from "@mui/material";
import { useState } from "react";

type IProps = {
  title: string;
  items: any[];
  sx?: SxProps;
};

const OrderSummary = ({ title, items, sx }: IProps) => {
  const [discount, setDiscount] = useState<number>(0);
  const total = items?.reduce((acc: number, item: any) => acc + item?.price, 0);

  return (
    <>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 1,
          boxShadow: "1px 1px 4px rgba(0,0,0,0.1)",
          p: { xs: 2, md: 3 },
          ...sx,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        {items?.map((item: any, i) => (
          <Stack
            key={item?._id}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 1.5 }}
          >
            <Typography variant="body1" fontWeight={600}>
              {item?.product?.title.slice(0, 20) ||
                item?.course?.title.slice(0, 20) ||
                item?.book?.title.slice(0, 20)}
              ...
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              TK. {item?.price}
            </Typography>
          </Stack>
        ))}
        {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 3 }}
        >
          <Typography variant="body1" fontWeight={600}>
            Discount
          </Typography>
          <Typography variant="body1" fontWeight={600} color="primary">
            -TK. {discount}
          </Typography>
        </Stack> */}

        <Divider sx={{ mt: 4, mb: 1.5 }} />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 3 }}
        >
          <Typography variant="body1" fontWeight={800}>
            Total
          </Typography>
          <Typography variant="body1" fontWeight={800}>
            TK. {total - discount}
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default OrderSummary;

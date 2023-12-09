import { Dialog, Button, Box, Typography } from "@mui/material";
import Image from "next/image";

const OrderSuccessModal = ({ open, handleClose }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ px: 10, py: 6, textAlign: "center" }}>
        <Image
          src="/icons/success.png"
          alt="success"
          width={200}
          height={200}
        />

        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mt: 2, color: "primary.main" }}
        >
          Payment Successful!
        </Typography>

        <Typography variant="body1" sx={{ my: 3 }}>
          Please check your email for transaction details
        </Typography>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleClose}
        >
          Continue
        </Button>
      </Box>
    </Dialog>
  );
};

export default OrderSuccessModal;

import { Dialog, Button, Box, Typography } from "@mui/material";
import Image from "next/image";

const OrderFailedModal = ({ open, handleClose }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ px: 10, py: 6, maxWidth: 500, textAlign: "center" }}>
        <Image
          src="/icons/failed.png"
          alt="failed"
          width={200}
          height={200}
        />

        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mt: 2, color: "error.main" }}
        >
          Payment UnSuccessful!
        </Typography>

        <Typography variant="body1" sx={{ my: 3 }}>
          Please try again, if still same error you can try another method
        </Typography>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleClose}
          color="error"
        >
          Try Again
        </Button>
      </Box>
    </Dialog>
  );
};

export default OrderFailedModal;

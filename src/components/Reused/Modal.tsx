import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, IconButton, Stack, Typography } from "@mui/material";
import { IModalProps } from "../../Interfaces/common.interface";

const CustomModal = ({ children, handleClose, open, title }: IModalProps) => {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{ "& .MuiDialog-paper": { borderRadius: 3, p: 1 } }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ borderBottom: "1px solid #eee", py: 1 }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1, pl: 2 }}>
          {title}
        </Typography>

        <IconButton
          onClick={handleClose}
          sx={{ color: "black", mt: 1, ml: "4px" }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <Box>{children}</Box>
    </Dialog>
  );
};

export default CustomModal;

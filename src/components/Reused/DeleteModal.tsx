import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import React, { useState } from "react";

const DeleteModal = ({ open, handleClose, handleDelete, title }) => {
  const [loader, setLoader] = useState(false);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ display: "flex" }}>
        <WarningIcon
          sx={{
            color: "orange",
          }}
        />{" "}
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: 600,
            ml: 1,
          }}
        >
          Warning
        </Typography>
      </DialogTitle>
      <DialogContent>{title}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          No
        </Button>
        <Button
          onClick={async () => {
            setLoader(true);
            await handleDelete();
            setLoader(false);
          }}
          autoFocus
          variant="contained"
          color="error"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;

import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function PaymentModal({open, handleClose, paymentType, price}) {
  const router = useRouter();
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => {
          handleClose();
        }}>
          {paymentType} payment
        </BootstrapDialogTitle>
        <DialogContent dividers>
          Please make your payment using following information <br /> <br />
          {
            paymentType === "bkash" ? <Box>
              Bkash Number: 01301240580 <br />
              Total Payment: {price} <br />
            </Box> : <Box>
              Name: MOHAMMAD JIHAN CHOWDHURY <br />
              Bank Acc: 1991570023171 <br />
              Bank: Dutch Bangla Bank Ltd <br />
              Branch: UTTARA SONARGAON JANOPOD BRANCH <br />
              Routing: 090264656 <br />
              Swift: DBBLBDDH
              <br />
              Total Payment: {price}
            </Box>
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => {
            handleClose();
            router.push("/confirmCheckout")
          }}>
            Next
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

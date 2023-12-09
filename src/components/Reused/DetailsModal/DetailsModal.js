import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, Divider, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../Redux/orderSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, textTransform: "capitalize" }} {...other}>
      {children}
      {onClose ? (
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

export default function DetailsModal({ open, onClose, type, product }) {
  const dispatch = useDispatch();
  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="md"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
          {type} details
        </BootstrapDialogTitle>
        <DialogContent dividers mb={2} sx={{ py: 3 }}>
          <Grid container spacing={2}>
            <Grid item lg={6} xs={12}>
              <Box
                sx={{
                  my: 5,
                }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { lg: "20px", sm: "16px", xs: "14px" },
                      fontWeight: "600",
                      p: 2,
                    }}
                  >
                    {product.title}
                  </Typography>
                  {product?.subCategory ? (
                    <Typography px={2} variant="body2">
                      {product?.category} / {product?.subCategory}
                    </Typography>
                  ) : (
                    <Typography px={2} variant="body2">
                      {product?.category}
                    </Typography>
                  )}
                  <Typography variant="body1" p={2}>
                    {product?.description}
                  </Typography>
                  <Typography variant="h5" px={2}>
                    {product?.price}
                  </Typography>
                  {product?.link && (
                    <Link href={product?.link}>
                      <a target="_blank">
                        <Typography
                          sx={{ p: 2, color: "#008AD8", cursor: "pointer" }}
                          onClick={onClose}
                        >
                          Request for reading access
                        </Typography>
                      </a>
                    </Link>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Box
                sx={{
                  my: 8,
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    position: "sticky",
                  }}
                >
                  <Box
                    component="img"
                    src={product?.image}
                    alt={product?.title}
                    sx={{
                      objectFit: "contain",
                      height: "300px",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {type === "service" ? (
            <Link href="mailto:info@1qualitysolutions.com">
              <a target="_blank">
                <Button
                  autoFocus
                  variant="contained"
                  color="primary"
                  onClick={onClose}
                >
                  Contact for quotation
                </Button>
              </a>
            </Link>
          ) : (
            <>
              {product?.price ? (
                <Link href="/checkout">
                  <a>
                    <Button
                      autoFocus
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        dispatch(
                          setProduct({
                            name: product.title,
                            price: product?.price,
                          })
                        );
                        onClose();
                      }}
                    >
                      Buy Now
                    </Button>
                  </a>
                </Link>
              ) : (
                <Link href={product?.link}>
                  <a target="_blank">
                    <Button
                      autoFocus
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        onClose();
                      }}
                    >
                      Download
                    </Button>
                  </a>
                </Link>
              )}
            </>
          )}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

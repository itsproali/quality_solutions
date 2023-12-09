import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { IAddress } from "../../Interfaces/Account.interface";
import UpdateAddressModal from "../../components/Reused/Account/UpdateAddressModal";
import CustomModal from "../../components/Reused/Modal";
import { AddressService } from "../../services/AddressService";

type IProps = {
  address: IAddress;
  selectedAddress?: IAddress | null;
  setSelectedAddress?: React.Dispatch<
    React.SetStateAction<IAddress | null | undefined>
  >;
};

const AddressCard = ({
  address,
  selectedAddress,
  setSelectedAddress,
}: IProps) => {
  const [updateAddressModal, setUpdateAddressModal] = useState(false);
  const [deleteAddressModal, setDeleteAddressModal] = useState({
    address: null,
    open: false,
  });
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { mutate: deleteAddress, isLoading: deleteLoading } = useMutation(
    (id: string) => AddressService.deleteAddress(id, session?.accessToken),
    {
      onSuccess: () => {
        toast.success("Address Deleted Successfully");
        queryClient.invalidateQueries(["address"]);
        setDeleteAddressModal({ open: false, address: null });
      },
      onError: (error: any) => {
        toast.error("Something went wrong");
      },
    }
  );

  const { mutate: makeDefault } = useMutation(
    (data: any) =>
      AddressService.updateAddress(data?.id, data, session?.accessToken),
    {
      onSuccess: () => {
        toast.success("Default Address Successfully");
        queryClient.invalidateQueries(["address"]);
      },
      onError: (error: any) => {
        toast.error("Something went wrong");
      },
    }
  );

  const handleDelete = (id: string) => {
    deleteAddress(id);
  };

  const handleDefault = (id: string) => {
    makeDefault({ id, isDefault: true });
  };
  return (
    <>
      <Card
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: "0px 0px 10px rgba(200, 200, 200, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          bgcolor:
            selectedAddress?._id === address?._id
              ? "rgba(63, 81, 181, 0.1)"
              : "white",
          border: "1px solid",
          borderColor:
            selectedAddress?._id === address?._id ? " #3f51b5" : "grey.300",
        }}
        onClick={() => setSelectedAddress && setSelectedAddress(address)}
      >
        <Box>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
            <Typography
              variant="body1"
              fontWeight={600}
              color="primary"
              sx={{ textTransform: "capitalize" }}
            >
              {address?.type}
            </Typography>
            {address?.isDefault && (
              <Chip
                label="Default"
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Stack>

          {/* <Typography variant="subtitle2" fontWeight={500}>
            {address?.phone}
          </Typography>

          <Typography variant="subtitle2" fontWeight={500}>
            {address?.email}
          </Typography> */}

          <Typography variant="body2" sx={{ mt: 3 }}>
            {address?.address} , {address?.city} , {address?.state} -{" "}
            {address?.postalCode}
          </Typography>
        </Box>

        <Stack direction="row" spacing={0.5}>
          <IconButton
            color="info"
            title="Update this address"
            onClick={() => setUpdateAddressModal(true)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="warning"
            title="Delete this address"
            onClick={() => setDeleteAddressModal({ open: true, address })}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            color="success"
            title="Set as default address"
            disabled={address?.isDefault}
            onClick={() => handleDefault(address?._id)}
          >
            <GpsFixedIcon />
          </IconButton>
        </Stack>
      </Card>

      <UpdateAddressModal
        open={updateAddressModal}
        handleClose={() => setUpdateAddressModal(false)}
        address={address}
      />

      <CustomModal
        open={deleteAddressModal.open}
        handleClose={() =>
          setDeleteAddressModal({ open: false, address: null })
        }
        title="Delete Address"
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="body1">
            Are you sure you want to delete this address?
          </Typography>

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ mt: 8 }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() =>
                setDeleteAddressModal({ open: false, address: null })
              }
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(deleteAddressModal.address?._id)}
              disabled={deleteLoading}
              startIcon={deleteLoading ? <CircularProgress size={20} /> : null}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </CustomModal>
    </>
  );
};

export default AddressCard;

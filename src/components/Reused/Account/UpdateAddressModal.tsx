import { Box } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { IAddress } from "../../../Interfaces/Account.interface";
import { AddressService } from "../../../services/AddressService";
import CustomModal from "../Modal";
import AddressForm from "./AddressForm";

const UpdateAddressModal = ({ open, handleClose, address }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { mutate: updateAddress, isLoading } = useMutation(
    (data: IAddress) =>
      AddressService.updateAddress(data?._id, data, session?.accessToken),
    {
      onSuccess: () => {
        toast.success("Address Updated Successfully");
        queryClient.invalidateQueries(["address"]);
        handleClose();
      },
      onError: (error: any) => {
        toast.error("Something went wrong");
      },
    }
  );

  const handleSubmit = (data) => {
    updateAddress({ ...data, _id: address._id, isDefault: address.isDefault });
    handleClose();
  };

  return (
    <CustomModal open={open} handleClose={handleClose} title="Update Address">
      <Box sx={{ p: 2 }}>
        <AddressForm
          handleSubmit={handleSubmit}
          address={address}
          isLoading={isLoading}
        />
      </Box>
    </CustomModal>
  );
};

export default UpdateAddressModal;

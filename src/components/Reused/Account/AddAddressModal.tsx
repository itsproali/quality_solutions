/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { AddressWithoutId } from "../../../Interfaces/Account.interface";
import { IModalProps } from "../../../Interfaces/common.interface";
import CustomModal from "../Modal";
import AddressForm from "./AddressForm";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddressService } from "../../../services/AddressService";
import { useSession } from "next-auth/react";
import { useAddresses } from "../../../hooks/useAddress";

const AddAddressModal = ({ open, handleClose }: IModalProps) => {
  const { data: addresses } = useAddresses();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (addresses?.length < 1) {
      setIsDefault(true);
    }
  }, [addresses?.length]);

  const { mutate, isLoading } = useMutation(
    (data: AddressWithoutId) =>
      AddressService.createAddress(data, session?.accessToken),
    {
      onSuccess: () => {
        toast.success("Address Added Successfully");
        queryClient.invalidateQueries(["address"]);
        setIsDefault(false);
        handleClose();
      },

      onError: (error: any) => {
        toast.error("Something went wrong");
      },
    }
  );

  const handleSubmit = (data: AddressWithoutId) => {
    mutate({ ...data, isDefault });
  };

  return (
    <CustomModal open={open} handleClose={handleClose} title="Add New Address">
      <Box sx={{ p: 2 }}>
        <AddressForm handleSubmit={handleSubmit} isLoading={isLoading} />
      </Box>
    </CustomModal>
  );
};

export default AddAddressModal;

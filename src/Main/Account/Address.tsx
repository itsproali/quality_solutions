import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddAddressModal from "../../components/Reused/Account/AddAddressModal";
import { useAddresses } from "../../hooks/useAddress";
import AddressCard from "./AddressCard";
import EmptyUI from "../../components/Reused/EmptyUI";

const Address = () => {
  const { data: addressData, isLoading: addressLoading } = useAddresses();
  const [addAddressModal, setAddAddressModal] = useState(false);

  const handleAddAddress = () => {
    setAddAddressModal(true);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          Address
        </Typography>

        <Button
          variant="outlined"
          sx={{
            px: 3,
            color: "grey.800",
            borderColor: "grey.400",
            fontWeight: 600,
            borderRadius: 2,
          }}
          startIcon={<AddIcon />}
          onClick={handleAddAddress}
        >
          Add New Address
        </Button>
      </Stack>

      {addressLoading ? (
        <Box sx={{ height: 300, display: "grid", placeContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : addressData?.length ? (
        <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
          {addressData?.map((address) => (
            <AddressCard key={address._id} address={address} />
          ))}
        </Stack>
      ) : (
        <EmptyUI title="No Address Found!" />
      )}

      <AddAddressModal
        open={addAddressModal}
        handleClose={() => setAddAddressModal(false)}
      />
    </>
  );
};

export default Address;

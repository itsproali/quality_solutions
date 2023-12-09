import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IAddress } from "../../Interfaces/Account.interface";
import AddAddressModal from "../../components/Reused/Account/AddAddressModal";
import EmptyUI from "../../components/Reused/EmptyUI";
import { useAddresses } from "../../hooks/useAddress";
import AddressCard from "../Account/AddressCard";

type IProps = {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAddress: IAddress | null;
  setSelectedAddress: React.Dispatch<React.SetStateAction<IAddress | null>>;
  handleFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userInfo: {
    name: string;
    email: string;
    phone: string;
  };
};

const CheckoutForm = ({
  checked,
  setChecked,
  selectedAddress,
  setSelectedAddress,
  handleFieldChange,
  userInfo,
}: IProps) => {
  // State and hooks

  const [addAddressModal, setAddAddressModal] = useState(false);

  const { data: addressData, isLoading: addressLoading } = useAddresses();

  useEffect(() => {
    // set selected address if address is default
    const defaultAddress = Array.isArray(addressData)
      ? addressData?.find((address: IAddress) => address.isDefault)
      : null;
    setSelectedAddress(defaultAddress);
  }, [addressData, setSelectedAddress]);

  const handleAddAddress = () => {
    setAddAddressModal(true);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: "1px 2px 5px 1px rgba(0,0,0,0.1)",
          p: { xs: 2, md: 4 },
        }}
      >
        <Typography
          sx={{ fontSize: "1.2rem", fontWeight: "600", textAlign: "center" }}
        >
          Please fill below form to place your order
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 4, mb: 3 }}>
          Contact Information
        </Typography>

        {/* Form */}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InputLabel
              htmlFor="email"
              sx={{ mb: 1, color: "text.secondary", fontWeight: 500 }}
            >
              Email address *
            </InputLabel>
            <TextField
              fullWidth
              name="email"
              value={userInfo?.email}
              placeholder="Enter your email address"
              onChange={handleFieldChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <InputLabel
              htmlFor="name"
              sx={{ mb: 1, color: "text.secondary", fontWeight: 500 }}
            >
              Name *
            </InputLabel>
            <TextField
              fullWidth
              name="name"
              value={userInfo?.name}
              placeholder="Enter your name"
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel
              htmlFor="phone"
              sx={{ mb: 1, color: "text.secondary", fontWeight: 500 }}
            >
              Mobile Number *
            </InputLabel>
            <TextField
              fullWidth
              name="phone"
              value={userInfo?.phone}
              placeholder="Enter your Mobile No."
              onChange={handleFieldChange}
            />
          </Grid>
        </Grid>

        {/* Address */}
        <Box sx={{ mt: 6 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Address
            </Typography>

            <Button
              variant="text"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddAddress}
            >
              Add New Address
            </Button>
          </Stack>

          {addressLoading ? (
            <Box
              sx={{
                display: "grid",
                placeContent: "center",
                width: "100%",
                height: 200,
              }}
            >
              <CircularProgress />
            </Box>
          ) : !addressData?.length ? (
            <EmptyUI title="No Address Found" sx={{ height: 200, p: 0 }} />
          ) : (
            <Stack direction="column" spacing={2} sx={{ mt: 1 }}>
              {addressData?.map((address: IAddress) => (
                <AddressCard
                  key={address._id}
                  address={address}
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                />
              ))}
            </Stack>
          )}
        </Box>

        {/* Terms & Conditions */}
        <FormControl fullWidth sx={{ mt: 3 }}>
          <Typography sx={{ fontSize: "0.9rem" }}>
            <Checkbox
              name="terms"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            I have read and agree to the{" "}
            <Link href="/terms-and-conditions" target="_blank">
              terms and conditions,{" "}
            </Link>
            <Link href="/privacy-policy" target="_blank">
              privacy and policy,{" "}
            </Link>
            <Link href="/return-and-refund-policy" target="_blank">
              Return and Refund Policy
            </Link>
          </Typography>
        </FormControl>
      </Box>

      <AddAddressModal
        open={addAddressModal}
        handleClose={() => setAddAddressModal(false)}
      />
    </>
  );
};

export default CheckoutForm;

// --------Form---------
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "../HookForm/FormProvider";
import RHFAutoComplete from "../HookForm/RHFAutoComplete";
import RHFRadioGroup from "../HookForm/RHFRadioGroup";
import RHFTextField from "../HookForm/RHFTextField";

import {
  CircularProgress,
  Button,
  FormControl,
  FormLabel,
  Stack,
} from "@mui/material";
import { bd_cities } from "../../../staticData/bd_cities";
import { bd_states } from "../../../staticData/bd_states";
import { IAddress } from "../../../Interfaces/Account.interface";
import { useEffect } from "react";

type IProps = {
  handleSubmit: HTMLFormElement["onSubmit"];
  address?: IAddress;
  isLoading?: boolean;
};

const AddressForm = ({
  address,
  handleSubmit: handleAddressSubmit,
  isLoading,
}: IProps) => {
  const AddressSchema = Yup.object().shape({
    type: Yup.mixed()
      .oneOf(["home", "work", "other"])
      .required("Type is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    postalCode: Yup.string().required("Postal Code is required"),
  });

  const methods = useForm({
    resolver: yupResolver(AddressSchema),
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (address) {
      setValue("type", address.type);
      setValue("address", address.address);
      setValue("city", address.city);
      setValue("state", address.state);
      setValue("postalCode", address.postalCode);
    }
  }, [setValue, address]);

  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(handleAddressSubmit)}
        id="address"
      >
        <FormControl fullWidth sx={{ mb: 2 }}>
          <FormLabel id="type">Type</FormLabel>
          <RHFRadioGroup
            name="type"
            label="Type"
            helperText={errors?.type?.message}
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
            options={[
              { value: "home", label: "Home" },
              { value: "work", label: "Work" },
              { value: "other", label: "Other" },
            ]}
          />
        </FormControl>

        <RHFTextField
          name="address"
          label="Address"
          helperText={errors?.address?.message}
        />

        <RHFAutoComplete
          name="city"
          label="City"
          helperText={errors?.city?.message}
          options={bd_cities}
          sx={{ my: 2 }}
        />

        <Stack direction="row" spacing={2.5} sx={{ my: 1 }}>
          <RHFAutoComplete
            name="state"
            label="State"
            helperText={errors?.state?.message}
            options={bd_states}
            sx={{ my: 1, width: "100%" }}
          />

          <RHFTextField
            name="postalCode"
            label="Postal Code"
            helperText={errors?.postalCode?.message}
          />
        </Stack>

        <Button
          variant="contained"
          type="submit"
          form="address"
          fullWidth
          sx={{ my: 1 }}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
          disabled={isLoading}
        >
          Submit
        </Button>
      </FormProvider>
    </>
  );
};

export default AddressForm;

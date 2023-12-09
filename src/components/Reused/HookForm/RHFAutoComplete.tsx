import { Autocomplete, TextField, SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type IProps = {
  name: string;
  helperText: string;
  options: string[];
  label: string;
  sx?: SxProps;
  [key: string]: any;
};

const RHFAutoComplete = ({
  name,
  helperText,
  options,
  label,
  sx,
  ...other
}: IProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          options={options}
          value={field.value || null}
          getOptionLabel={(option) => option} // Modify this according to your data structure
          isOptionEqualToValue={(option, value) => option === value}
          sx={sx}
          onChange={(_, newValue: string | null) => {
            field.onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name={name}
              label={label}
              value={field.value || null}
              error={!!error}
              helperText={error ? error.message : helperText}
              {...other}
            />
          )}
        />
      )}
    />
  );
};

export default RHFAutoComplete;

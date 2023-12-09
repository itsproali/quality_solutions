import { useFormContext, Controller } from "react-hook-form";
import { TextField, SxProps } from "@mui/material";

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  helperText: string;
  children: React.ReactNode;
  sx?: SxProps;
  [key: string]: any;
};

const RHFSelect = ({ name, children, helperText, sx, ...other }: IProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  mt: 0.5,
                  border: "1px solid ",
                  borderColor: "primary.main",
                  boxShadow: 1,
                  borderRadius: 2,
                  maxHeight: 200,
                  "&::-webkit-scrollbar": { display: "none" },
                },
              },
            },
            sx: { ...sx },
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
};

export default RHFSelect;

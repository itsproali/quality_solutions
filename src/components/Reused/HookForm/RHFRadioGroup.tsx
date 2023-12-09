import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  RadioProps,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const RHFRadioGroup = ({ name, label, options, helperText, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          <RadioGroup
            {...field}
            {...other}
            value={field?.value || null}
            onChange={(e) => field.onChange(e.target.value)}
          >
            {options?.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option?.value}
                control={<CustomRadio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          <FormHelperText error={!!error}>
            {error ? error?.message : helperText}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default RHFRadioGroup;

const CustomRadio = (props: RadioProps) => {
  return (
    <Radio
      checkedIcon={<CheckBoxIcon />}
      icon={<CheckBoxOutlineBlankIcon />}
      {...props}
    />
  );
};

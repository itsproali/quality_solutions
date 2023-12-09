import { FormEventHandler } from "react";
import { FormProvider as Form } from "react-hook-form";
import { Box, SxProps } from "@mui/material";

// ----------------------------------------------------------------------

type IProps = {
  children: React.ReactNode;
  methods: any;
  onSubmit: FormEventHandler<HTMLFormElement>;
  sx?: SxProps;
  id?: string;
};

export default function FormProvider({
  children,
  onSubmit,
  methods,
  sx,
  id,
}: IProps) {
  return (
    <Form {...methods}>
      <Box component="form" id={id} onSubmit={onSubmit} sx={{ ...sx }}>
        {children}
      </Box>
    </Form>
  );
}

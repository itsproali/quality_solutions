import {
  Button,
  CircularProgress,
  InputLabel,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import authFetch from "../../services/AxiosCommon";
import Link from "next/link";

// --------Form---------
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "../../components/Reused/HookForm/FormProvider";
import RHFTextField from "../../components/Reused/HookForm/RHFTextField";

const ForgotPasswordForm = () => {
  const Schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const methods = useForm({
    resolver: yupResolver(Schema),
  });

  const {
    setError,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const { mutate, isLoading } = useMutation(
    (data: { email: string }) => {
      return authFetch.post("/api/v1/user/forgot-password", data);
    },
    {
      onSuccess: (data) => {
        toast.success(`Password reset email sent`);
        reset();
      },
      onError: (error: any) => {
        setError("email", {
          message: error?.response?.data?.message || "Something went wrong",
        });
      },
    }
  );

  const handleForgot = async (data) => {
    mutate({ email: data.email });
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleForgot)}>
        {/* label */}
        <InputLabel
          htmlFor="email"
          sx={{ mb: 1, color: "text.secondary", fontWeight: 500 }}
        >
          Your Email address *
        </InputLabel>
        <RHFTextField
          name="email"
          helperText={errors.email?.message}
          placeholder="Enter your email address"
        />

        <Button
          type="submit"
          color="primary"
          fullWidth
          size="large"
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size="1rem" />}
          sx={{
            my: 3,
          }}
        >
          Reset Password
        </Button>
      </FormProvider>

      <Typography
        variant="body1"
        fontWeight={700}
        sx={{ color: "text.secondary", textAlign: "center" }}
      >
        <Link href="/login">Back to Log in</Link>
      </Typography>
    </>
  );
};

export default ForgotPasswordForm;

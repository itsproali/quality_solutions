import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import authFetch from "../../services/AxiosCommon";

// --------Form---------
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "../../components/Reused/HookForm/FormProvider";
import RHFTextField from "../../components/Reused/HookForm/RHFTextField";

type FormData = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordForm = () => {
  const router = useRouter();
  const { token } = router.query;

  const Schema = Yup.object().shape({
    password: Yup.string().required("Password is required").min(8),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .min(8),
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

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { mutate, isLoading } = useMutation(
    (data: { resetToken: string | string[]; password: string }) => {
      return authFetch.post("/api/v1/user/reset-password", data);
    },
    {
      onSuccess: (data) => {
        router.push("/login");
        toast.success("Password reset successfully");
      },
      onError: (error: any) => {
        setError("root", {
          message: error?.response?.data?.message || "Something went wrong",
        });
        // toast.error("Something went wrong");
      },
    }
  );

  const handleResetPass: SubmitHandler<FormData> = (data) => {
    if (!token) return;
    mutate({ resetToken: token, password: data.password });
  };
  return (
    <>
      {/* Set Background image for the page */}

      <FormProvider methods={methods} onSubmit={handleSubmit(handleResetPass)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InputLabel
              htmlFor="password"
              sx={{ mb: 1, color: "text.secondary", fontWeight: 500 }}
            >
              New Password *
            </InputLabel>
            <RHFTextField
              name="password"
              helperText={errors.password?.message}
              placeholder="Choose a strong password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel
              htmlFor="confirmPassword"
              sx={{ mb: 1, color: "text.secondary", fontWeight: 500 }}
            >
              Confirm Password *
            </InputLabel>
            <RHFTextField
              name="confirmPassword"
              helperText={errors.confirmPassword?.message}
              placeholder="RE-enter your password"
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {!!errors.root && (
          <Alert
            severity="error"
            variant="standard"
            sx={{
              width: "100%",
              mt: 1.5,
              fontWeight: 600,
              color: "error.main",
            }}
          >
            {errors.root?.message || "Something went wrong"}
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size="1rem" />}
          sx={{ mt: 2 }}
        >
          Reset Password
        </Button>
      </FormProvider>
    </>
  );
};

export default ResetPasswordForm;

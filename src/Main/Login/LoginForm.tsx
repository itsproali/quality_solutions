import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

// --------Form---------
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "../../components/Reused/HookForm/FormProvider";
import RHFTextField from "../../components/Reused/HookForm/RHFTextField";

type FormData = {
  email: string;
  password: string;
  remember?: boolean;
};

const LoginForm = () => {
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
    remember: Yup.boolean().optional(),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin: SubmitHandler<FormData> = async (data) => {
    const { email, password } = data;
    setLoader(true);
    signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    })
      .then((res) => {
        if (res?.error) {
          let errorData: any = res?.error;
          errorData = errorData?.replace("Error: ", "");
          errorData = JSON.parse(errorData);

          setError("root", {
            ...errorData,
            message: errorData?.msg,
          });
          if (errorData?.type === "verify") {
            router.push(`/verify-email?userId=${errorData?.userId}`);
          }
          return;
        }
        router
          .push(
            router.query.from ? decodeURIComponent(`${router.query.from}`) : "/"
          )
          .then();
      })
      .catch((err) => {
        setError("root", {
          message: err?.message,
        });
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <>
      {/* <Box component="form"> */}
      <FormProvider methods={methods} onSubmit={handleSubmit(handleLogin)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12} sx={{ mt: 1.5 }}>
            <InputLabel
              htmlFor="password"
              sx={{ mb: 1, color: "text.secondary", fontWeight: 500 }}
            >
              Your Password *
            </InputLabel>
            <RHFTextField
              name="password"
              helperText={errors.password?.message}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      title="Show/Hide password"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {!!errors?.root && (
            <Alert
              severity="error"
              variant="standard"
              sx={{
                width: "100%",
                ml: 3,
                mt: 1.5,
                fontWeight: 600,
                color: "error.main",
              }}
            >
              {errors.root.message || "Something went wrong"}
            </Alert>
          )}

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%", mt: 2, pl: 3 }}
          >
            <FormControlLabel
              value={remember}
              control={<Checkbox checked={remember} />}
              onChange={() => setRemember(!remember)}
              name="remember"
              label="Remember me"
              sx={{ fontWeight: 500 }}
            />

            <Link href="/forgot-password">
              <Typography
                variant="body2"
                sx={{
                  fontSize: {
                    md: "16px",
                    xs: "14px",
                  },
                  textAlign: "right",
                  textDecoration: "underline",
                  "&:hover": {
                    cursor: "pointer",
                    color: "primary.main",
                  },
                }}
              >
                Forgot password?
              </Typography>
            </Link>
          </Stack>
          <Grid item xs={12}>
            <Button
              type="submit"
              color="primary"
              fullWidth
              size="large"
              variant="contained"
              disabled={loader}
              startIcon={loader && <CircularProgress size="1rem" />}
            >
              Log in
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default LoginForm;

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React, { useRef, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { blueGrey } from "@mui/material/colors";
import authFetch from "../../services/AxiosCommon";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const firstName = useRef("");
  const lastName = useRef("");
  const email = useRef("");
  const password = useRef("");

  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    const signupInfo: {
      name: string;
      email: string;
      password: string;
    } = {
      name: firstName.current + " " + lastName.current,
      email: email.current,
      password: password.current,
    };
    try {
      const { data } = await authFetch.post(
        "/api/v1/user/register",
        signupInfo
      );
      if (data) {
        firstName.current = "";
        lastName.current = "";
        email.current = "";
        password.current = "";
        router.push(`/verify-email?userId=${data?.userId}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>

      <Container
        fixed
        sx={{
          minHeight: "68vh",
          mt: 20,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            borderRadius: "10px",
            p: 5,
            backgroundPosition: "center",
            boxShadow:
              "inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: {
                  xl: "50px",
                  lg: "40px",
                  md: "32px",
                  xs: "28px",
                },
                mb: 3,
                fontWeight: 700,
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 3 }}
              onSubmit={handleSignup}
            >
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    sx={{ background: blueGrey[50] }}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    variant="filled"
                    onChange={(e) => (firstName.current = e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    sx={{ background: blueGrey[50] }}
                    autoComplete="family-name"
                    name="lastName"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    variant="filled"
                    onChange={(e) => (lastName.current = e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ background: blueGrey[50] }}
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    variant="filled"
                    onChange={(e) => (email.current = e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ background: blueGrey[50] }}
                    id="standard-adornment-password"
                    autoComplete="new-password"
                    name="password"
                    label="Password"
                    required
                    fullWidth
                    variant="filled"
                    onChange={(e) => (password.current = e.target.value)}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
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
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loader}
                    startIcon={
                      loader ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : null
                    }
                    sx={{
                      background: "#3f51b5",
                      color: "white",
                      "&:hover": {
                        background: "#3f51b5",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="right">
                    Already have an account?{" "}
                    <Link href="/login">
                      <a>Log in</a>
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Signup;

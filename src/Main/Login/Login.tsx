import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";

import Link from "next/link";
import { blueGrey } from "@mui/material/colors";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Login = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  // console.log("session ", session);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const email = useRef("");
  const password = useRef("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoader(true);
    signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: false,
      callbackUrl: "/",
    })
      .then((res) => {
        if (res?.error) {
          let errorData: any = res?.error;
          console.log(res?.error);
          errorData = errorData?.replace("Error: ", "");
          errorData = JSON.parse(errorData);
          toast.error(errorData?.msg);
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
        // console.log("err ", err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
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
            // height: "50vh",
            borderRadius: "10px",
            p: 5,
            backgroundPosition: "center",
            backgroundSize: "cover",
            boxShadow:
              "inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box
            sx={{
              // marginTop: 8,
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
              Log in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={5}>
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
                    autoComplete="new-password"
                    name="password"
                    // type="password"
                    // id="password"
                    id="standard-adornment-password"
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
                    size="large"
                    variant="contained"
                    onClick={handleLogin}
                    disabled={loader}
                    startIcon={loader && <CircularProgress size="1rem" />}
                  >
                    Log in
                  </Button>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Link href="/forgot-password">
                  <a>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: {
                          md: "16px",
                          xs: "14px",
                        },
                        mt: 3,
                        textAlign: {
                          xs: "center",
                          md: "left",
                        },
                        color: "#2D89FF",
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </a>
                </Link>
                <Link href="/signup">
                  <a>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: {
                          md: "16px",
                          xs: "14px",
                        },
                        mt: 3,
                        textAlign: {
                          xs: "center",
                          md: "left",
                        },
                        color: "#2D89FF",
                      }}
                    >
                      Sign Up
                    </Typography>
                  </a>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;

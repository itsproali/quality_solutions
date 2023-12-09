import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import authFetch from "../src/services/AxiosCommon";

const VerifyEmailPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);

  const handleVerification = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoader(true);
    try {
      const { data } = await authFetch.post(`/api/v1/user/verify-email`, {
        userId,
        token: otp,
      });

      if (data?.status === "success") {
        toast.success("Successfully verified your email address");
        router.push("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  // handle resend otp
  const handleResendOtp = async () => {
    setLoader(true);
    try {
      const { data } = await authFetch.post(`/api/v1/user/resend-otp`, {
        userId,
      });

      toast.success(
        data?.message || "Successfully sent otp to your email address"
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  return (
    <Container fixed>
      <Box
        sx={{
          mt: 20,
          minHeight: "68vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            mb: 2,
          }}
        >
          Verify your email address
        </Typography>
        <Typography>
          We mailed you a four digit code. Please enter it below to verify your
          email address.
        </Typography>
        <Box
          component="form"
          onSubmit={handleVerification}
          sx={{
            display: "flex",
            mt: 3,
          }}
        >
          <TextField
            label="OTP"
            variant="outlined"
            size="small"
            sx={{
              width: "8rem",
              mr: 2,
            }}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            disabled={loader}
            startIcon={loader && <CircularProgress size="1rem" />}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            mt: 6,
          }}
        >
          <Typography>Didn&apos;t receive the code?</Typography>
          <Button variant="text" color="primary" onClick={handleResendOtp}>
            Resend
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default VerifyEmailPage;

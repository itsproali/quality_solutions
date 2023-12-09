import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

type IProps = {
  children: React.ReactNode;
  page: string;
  title?: string;
  subtitle?: string;
  linkPath?: string;
  linkText?: string;
};

const AuthContainer = ({
  children,
  page,
  title,
  subtitle,
  linkPath,
  linkText,
}: IProps) => {
  const handleGoogleLogin = () => {
    toast.warning("Google login is not available right now");
  };
  return (
    <>
      <Grid container sx={{ alignItems: "center" }}>
        {/* Left Side */}
        <Grid item xs={0} md={4} sx={{ display: { xs: "none", md: "grid" } }}>
          <Box
            sx={{
              minHeight: "100vh",
              backgroundImage: ` url("/images/auth_bg.png")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                height: "100vh",
                p: { md: 5, lg: 10 },
                cursor: "pointer",
              }}
            >
              <Link href="/">
                <Image
                  src="/images/logo_white.png"
                  alt="logo"
                  width={220}
                  height={150}
                />
              </Link>
            </Box>
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={8} sx={{ mt: { xs: 10, md: 4 } }}>
          <Box
            sx={{
              width: { xs: "100%", lg: "50%" },
              mx: "auto",
              p: { xs: 3, sm: 8 },
            }}
          >
            <Box sx={{ mb: 8, textAlign: "center", color: "text.secondary" }}>
              <Typography
                variant="h4"
                sx={{ fontSize: { xs: 25, md: 32 }, fontWeight: 700, mb: 1 }}
              >
                {title}
              </Typography>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
              >
                <Typography
                  variant="body1"
                  fontWeight={500}
                  sx={{ maxWidth: 400 }}
                >
                  {subtitle}
                </Typography>

                {linkPath && linkText && (
                  <Typography variant="body1" fontWeight={700}>
                    <Link href={linkPath}>{linkText}</Link>
                  </Typography>
                )}
              </Stack>
            </Box>
            <Box>{children}</Box>

            {/* Social Login */}
            <Box
              sx={{
                mt: 3,
                width: "100%",
                display: "none",
                // page === "login" || page === "signup" ? "block" : "none",
              }}
            >
              <Divider>Or</Divider>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mt: 2,
                  borderColor: "grey.200",
                  color: "text.secondary",
                  "&:hover": {
                    borderColor: "grey.200",
                    bgcolor: "grey.100",
                  },
                }}
                onClick={handleGoogleLogin}
              >
                <Box
                  component="img"
                  src="/icons/google.png"
                  alt="google"
                  width={35}
                  height={35}
                />
                <Typography fontWeight={600}>Sign In with Google</Typography>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthContainer;

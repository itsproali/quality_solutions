import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { userMenus } from "../../staticData/navlinks";
import Footer from "../Reused/Footer/Footer";
import Header from "../Reused/Header/Header";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  return (
    <Box>
      <Header />
      <Container
        fixed
        component="main"
        sx={{
          py: { xs: 12, md: 20 },
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={0}
            md={3}
            sx={{ pr: { xs: 0, md: 4 }, borderRight: "1px solid #DDDDDD" }}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "inherit",
                  position: "sticky",
                  top: 100,
                },
              }}
            >
              {userMenus?.map((item, i) => (
                <CustomMenuButton
                  key={i}
                  item={item}
                  active={router?.pathname === item?.route}
                />
              ))}
              <Button
                onClick={() =>
                  signOut({ callbackUrl: `/login`, redirect: true })
                }
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  px: 2,
                  gap: 2,
                  py: 1.5,
                  color: "error.main",
                  "&:hover": {
                    bgcolor: "error.lighter",
                  },
                }}
              >
                <Image
                  src="/icons/logout.png"
                  alt="icon"
                  height={20}
                  width={20}
                />
                <Typography variant="body1">Log Out</Typography>
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            sx={{ pl: { xs: 0, md: 4 }, minHeight: "70vh" }}
          >
            {children}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default DashboardLayout;

const CustomMenuButton = ({ item, active, ...rest }) => {
  return (
    <Link href={item?.route}>
      <Button
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 2,
          my: 1,
          py: 1.5,
          px: 2,
          color: active ? "white" : "text.primary",
          bgcolor: active ? "primary.main" : "transparent",
          "& img": { filter: active ? "invert(1)" : "invert(0)" },
          "&:hover": { bgcolor: "primary.lighter" },
        }}
      >
        <Image src={item?.icon} alt={item?.name} height={20} width={20} />
        <Typography variant="body1">{item?.name}</Typography>
      </Button>
    </Link>
  );
};

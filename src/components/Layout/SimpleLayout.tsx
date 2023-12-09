import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
type IProps = {
  children: React.ReactNode;
};
const SimpleLayout = ({ children }: IProps) => {
  const router = useRouter();
  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#F7FAFF", color: "#28313D" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              sx={{
                cursor: "pointer",
              }}
            >
              <Image
                src="/images/logo.svg"
                alt="One Quality Solutions"
                height={80}
                width={80}
                onClick={() => router.push("/")}
              />
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </>
  );
};

export default SimpleLayout;

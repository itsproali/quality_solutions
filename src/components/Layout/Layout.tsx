import { Box } from "@mui/material";
import Footer from "../Reused/Footer/Footer";
import Header from "../Reused/Header/Header";

const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box component="main">{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;

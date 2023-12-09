import { Box, styled, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const [active, setActive] = useState();
  return (
    <Box
      sx={{
        width: "220px",
        background: "white",
        boxShadow: "0 0 10px lightgray",
        position: "fixed",
        top: "80px",
        left: "0px",
        height: "100vh",
        pt: 5,
      }}
    >
      <SidebarMenu onClick={() => router.push("/allorder")}>
        All Order
      </SidebarMenu>
      <SidebarMenu onClick={() => router.push("/add-admin")}>
        Add Admin
      </SidebarMenu>
    </Box>
  );
};

export default Sidebar;

const SidebarMenu = styled(Typography)({
  padding: "8px 16px",
  width: "150px",
  margin: "auto",
  backgroundColor: "#2D89FF",
  borderRadius: "20px",
  cursor: "pointer",
  color: "white",
  marginBottom: "10px",
  transition: ".3s",
  ":hover": {
    transform: "scale(1.2)",
  }
});

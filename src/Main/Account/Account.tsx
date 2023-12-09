import LockIcon from "@mui/icons-material/Lock";
import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Container, Grid, Tabs } from "@mui/material";
import { useState } from "react";
import Address from "./Address";
import Password from "./Password";
import Profile from "./Profile";
import { CustomTab, CustomTabPanel } from "./Tabs";

const Account = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 20, bgcolor: "#F7F7F7" }}>
      <Container fixed>
        <Grid container spacing={4}>
          <Grid item md={3} xs={12}>
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 1,
                py: 2,
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                variant="fullWidth"
              >
                <CustomTab
                  icon={<PersonIcon />}
                  label="Profile"
                  id="vertical-tab-0"
                />
                <CustomTab
                  icon={<LockIcon />}
                  label="Password"
                  id="vertical-tab-1"
                />
                <CustomTab
                  icon={<MapIcon />}
                  label="Address"
                  id="vertical-tab-2"
                />
              </Tabs>
            </Box>
          </Grid>
          <Grid item md={9} xs={12}>
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 1,
                p: { xs: 2, md: 4 },
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CustomTabPanel value={value} index={0}>
                <Profile />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Password />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <Address />
              </CustomTabPanel>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Account;

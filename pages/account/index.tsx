import Head from "next/head";
import Account from "../../src/Main/Account/Account";
import { privateRoute } from "../../src/utils/utils";
import { NextPage } from "next";
import DashboardLayout from "../../src/components/Layout/DashboardLayout";
import Profile from "../../src/Main/Account/Profile";
import Address from "../../src/Main/Account/Address";
import { Box } from "@mui/material";

const AccountPage = () => {
  return (
    <>
      <Head>
        <title>Account Settings | One Quality Solutions</title>
      </Head>

      {/* <Account /> */}
      <Profile />
      <Box sx={{ mt: 4 }}>
        <Address />
      </Box>
    </>
  );
};

export default AccountPage;

AccountPage.getInitialProps = async (context: any) => privateRoute(context);
AccountPage.getLayout = (page: NextPage) => (
  <DashboardLayout>{page}</DashboardLayout>
);

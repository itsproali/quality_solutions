import { NextPage } from "next";
import Password from "../../src/Main/Account/Password";
import DashboardLayout from "../../src/components/Layout/DashboardLayout";

const PasswordPage = () => {
  return (
    <>
      <Password />
    </>
  );
};

export default PasswordPage;

PasswordPage.getLayout = (page: NextPage) => (
  <DashboardLayout>{page}</DashboardLayout>
);

import React from "react";
import { privateRoute } from "../../src/utils/utils";
import MyDocuments from "../../src/Main/MyDocuments/MyDocuments";
import DashboardLayout from "../../src/components/Layout/DashboardLayout";

const MyDocumentsPage = () => {
  return <MyDocuments />;
};

export default MyDocumentsPage;

MyDocumentsPage.getInitialProps = async (context: any) => privateRoute(context);
MyDocumentsPage.getLayout = (page: any) => (
  <DashboardLayout>{page}</DashboardLayout>
);
